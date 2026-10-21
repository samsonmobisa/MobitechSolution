import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/login');
  }

  const [leadCount, clientCount, projectCount, invoiceCount] = await Promise.all([
    prisma.lead.count(),
    prisma.client.count(),
    prisma.project.count(),
    prisma.invoice.count()
  ]);

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4
  });

  const recentInvoices = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4
  });

  const businessHealth = [
    { label: 'Leads', value: leadCount, tone: 'blue' },
    { label: 'Clients', value: clientCount, tone: 'emerald' },
    { label: 'Projects', value: projectCount, tone: 'violet' },
    { label: 'Invoices', value: invoiceCount, tone: 'amber' }
  ];

  return (
    <div className="p-6 md:p-8">
      <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Operations overview</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            {session.user.name || 'Admin'}
          </span>
          <Link href="/" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Site home
          </Link>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {businessHealth.map((metric) => (
          <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`mb-4 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${metric.tone === 'blue' ? 'bg-blue-50 text-blue-700' : metric.tone === 'emerald' ? 'bg-emerald-50 text-emerald-700' : metric.tone === 'violet' ? 'bg-violet-50 text-violet-700' : 'bg-amber-50 text-amber-700'}`}>
              {metric.label}
            </div>
            <p className="text-3xl font-black text-slate-900">{metric.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div id="pipeline" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Recent leads</h2>
            <span className="text-sm text-slate-500">Live pipeline</span>
          </div>

          <div className="space-y-4">
            {recentLeads.length === 0 ? (
              <p className="text-sm text-slate-500">No leads yet.</p>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div>
                    <p className="font-semibold text-slate-900">{lead.name}</p>
                    <p className="text-sm text-slate-500">{lead.company || 'Independent lead'} • {lead.status}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium text-slate-700">{lead.email}</p>
                    <p className="text-slate-500">{new Date(lead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div id="invoices" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Invoices</h2>
            <span className="text-sm text-slate-500">Finance</span>
          </div>

          <div className="space-y-4">
            {recentInvoices.length === 0 ? (
              <p className="text-sm text-slate-500">No invoices yet.</p>
            ) : (
              recentInvoices.map((invoice) => (
                <div key={invoice.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{invoice.clientName}</p>
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">{invoice.status}</span>
                  </div>
                  <p className="mt-3 text-2xl font-black text-slate-900">${invoice.total.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="clients" className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-slate-900">Client pipeline</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>Enterprise rollout</span>
              <span className="font-semibold text-slate-900">12%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>Retention growth</span>
              <span className="font-semibold text-slate-900">91%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span>Renewal pipeline</span>
              <span className="font-semibold text-slate-900">$45k</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-slate-900">Quick actions</h2>
          <div className="space-y-3">
            <Link href="/pricing" className="block rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700">Launch a new service plan</Link>
            <Link href="/dashboard#pipeline" className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">Review leads</Link>
            <Link href="/dashboard#invoices" className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">Manage invoices</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
