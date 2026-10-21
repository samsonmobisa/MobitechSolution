'use client';

import { FormEvent, useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus({ type: 'success', message: 'Thanks! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to send message.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 text-slate-900 shadow-soft">
      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Jane Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="jane@company.com"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
            Project details
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tell us about your project, goals, and timeline."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>

        {status.message ? (
          <p
            className={`rounded-xl px-4 py-3 text-sm ${
              status.type === 'success'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
