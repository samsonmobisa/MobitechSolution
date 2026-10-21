'use client';

import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    price: '$799',
    description: 'Perfect for small digital projects and business sites.',
    features: ['Landing page design', 'Basic analytics', 'One support cycle']
  },
  {
    name: 'Growth',
    price: '$1,990',
    description: 'Best for scaling businesses that need a CRM and product support.',
    features: ['Full website + CRM', 'Priority support', 'Monthly growth reporting'],
    highlight: true
  },
  {
    name: 'Enterprise',
    price: '$4,900',
    description: 'For complex systems, integrations, and ongoing digital operations.',
    features: ['Custom platform build', 'Dedicated account manager', 'Advanced automation']
  }
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(planName: string, amount: number) {
    setLoading(planName);

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName, amount })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to initialize payment.');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      alert('Checkout is not available right now. Please configure your Stripe key.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Pricing</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Choose the right growth plan.</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 shadow-sm ${
                plan.highlight ? 'border-blue-500 bg-blue-600 text-white shadow-soft' : 'border-slate-200 bg-white text-slate-900'
              }`}
            >
              <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${plan.highlight ? 'text-blue-100' : 'text-blue-600'}`}>
                {plan.name}
              </p>
              <p className="mt-5 text-4xl font-black">{plan.price}</p>
              <p className={`mt-3 text-sm ${plan.highlight ? 'text-blue-100' : 'text-slate-600'}`}>
                {plan.description}
              </p>

              <ul className={`mt-6 space-y-3 text-sm ${plan.highlight ? 'text-blue-50' : 'text-slate-700'}`}>
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.name, Number(plan.price.replace(/[^\d.]/g, '')) * 100)}
                className={`mt-8 w-full rounded-xl px-5 py-3 font-semibold transition ${
                  plan.highlight ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading === plan.name ? 'Processing...' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
