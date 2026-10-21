import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/login');
  }

  const metrics = await Promise.all([
    prisma.lead.count(),
    prisma.client.count(),
    prisma.project.count(),
    prisma.invoice.count()
  ]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-slate-950 p-6 text-white md:block">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Mobitech</p>
          <h2 className="mt-2 text-2xl font-black">Business CRM</h2>
        </div>

        <nav className="space-y-2 text-sm font-medium text-slate-300">
          <a href="/dashboard" className="block rounded-xl bg-slate-800 px-4 py-3 text-white">Overview</a>
          <a href="/dashboard#pipeline" className="block rounded-xl px-4 py-3 transition hover:bg-slate-800 hover:text-white">Pipeline</a>
          <a href="/dashboard#clients" className="block rounded-xl px-4 py-3 transition hover:bg-slate-800 hover:text-white">Clients</a>
          <a href="/dashboard#invoices" className="block rounded-xl px-4 py-3 transition hover:bg-slate-800 hover:text-white">Invoices</a>
          <a href="/pricing" className="block rounded-xl px-4 py-3 transition hover:bg-slate-800 hover:text-white">Pricing</a>
        </nav>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Snapshot</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Leads</span><strong>{metrics[0]}</strong></div>
            <div className="flex justify-between"><span>Clients</span><strong>{metrics[1]}</strong></div>
            <div className="flex justify-between"><span>Projects</span><strong>{metrics[2]}</strong></div>
            <div className="flex justify-between"><span>Invoices</span><strong>{metrics[3]}</strong></div>
          </div>
        </div>
      </aside>

      <main className="md:ml-72">
        {children}
      </main>
    </div>
  );
}
