import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Admin</p>
            <h1 className="mt-2 text-3xl font-black">Inbox</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Back to site
          </Link>
        </div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No messages yet.
            </div>
          ) : (
            messages.map((message) => (
              <article key={message.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{message.name}</p>
                    <p className="text-sm text-slate-500">{message.email}</p>
                  </div>
                  <time className="text-xs uppercase tracking-[0.15em] text-slate-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </time>
                </div>
                <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-700">{message.message}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
