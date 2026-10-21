"use client";

import { useEffect, useMemo, useState } from 'react';

type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  source?: string | null;
  status: string;
  notes?: string | null;
  createdAt: string;
};

type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  status: string;
  segment?: string | null;
  projectValue?: number | null;
  createdAt: string;
};

type Project = {
  id: string;
  name: string;
  clientName: string;
  status: string;
  value?: number | null;
  deadline?: string | null;
  description?: string | null;
  createdAt: string;
};

type Invoice = {
  id: string;
  clientName: string;
  total: number;
  status: string;
  dueDate?: string | null;
  createdAt: string;
};

const leadFormDefaults = {
  name: '',
  email: '',
  company: '',
  phone: '',
  source: '',
  status: 'new',
  notes: ''
};

const clientFormDefaults = {
  name: '',
  company: '',
  email: '',
  phone: '',
  status: 'active',
  segment: '',
  projectValue: ''
};

const projectFormDefaults = {
  name: '',
  clientName: '',
  status: 'in-progress',
  value: '',
  deadline: '',
  description: ''
};

const invoiceFormDefaults = {
  clientName: '',
  total: '',
  status: 'pending',
  dueDate: ''
};

export function DashboardCRM({ userName }: { userName: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [leadForm, setLeadForm] = useState(leadFormDefaults);
  const [clientForm, setClientForm] = useState(clientFormDefaults);
  const [projectForm, setProjectForm] = useState(projectFormDefaults);
  const [invoiceForm, setInvoiceForm] = useState(invoiceFormDefaults);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [leadRes, clientRes, projectRes, invoiceRes] = await Promise.all([
        fetch('/api/leads', { cache: 'no-store' }),
        fetch('/api/clients', { cache: 'no-store' }),
        fetch('/api/projects', { cache: 'no-store' }),
        fetch('/api/invoices', { cache: 'no-store' })
      ]);

      const [leadData, clientData, projectData, invoiceData] = await Promise.all([
        leadRes.json(),
        clientRes.json(),
        projectRes.json(),
        invoiceRes.json()
      ]);

      setLeads(Array.isArray(leadData) ? leadData : []);
      setClients(Array.isArray(clientData) ? clientData : []);
      setProjects(Array.isArray(projectData) ? projectData : []);
      setInvoices(Array.isArray(invoiceData) ? invoiceData : []);
    } catch (error) {
      console.error(error);
      setMessage('Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const analytics = useMemo(() => {
    const monthlyPipeline = [
      { label: 'Jan', value: 20 },
      { label: 'Feb', value: 28 },
      { label: 'Mar', value: 37 },
      { label: 'Apr', value: 45 },
      { label: 'May', value: 52 },
      { label: 'Jun', value: 68 }
    ];

    const revenueTotal = invoices.reduce((sum, item) => sum + Number(item.total || 0), 0);
    const activeClients = clients.filter((client) => client.status === 'active').length;
    const leadCount = leads.length;
    const projectValue = projects.reduce((sum, project) => sum + Number(project.value || 0), 0);

    return {
      monthlyPipeline,
      revenueTotal,
      activeClients,
      leadCount,
      projectValue
    };
  }, [clients, leads, projects, invoices]);

  async function handleSubmit(entity: 'lead' | 'client' | 'project' | 'invoice', event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const routeMap = {
      lead: '/api/leads',
      client: '/api/clients',
      project: '/api/projects',
      invoice: '/api/invoices'
    };

    const payloadMap = {
      lead: {
        ...leadForm,
        company: leadForm.company || undefined,
        phone: leadForm.phone || undefined,
        source: leadForm.source || undefined,
        notes: leadForm.notes || undefined
      },
      client: {
        ...clientForm,
        phone: clientForm.phone || undefined,
        segment: clientForm.segment || undefined,
        projectValue: clientForm.projectValue ? Number(clientForm.projectValue) : null
      },
      project: {
        ...projectForm,
        value: projectForm.value ? Number(projectForm.value) : null,
        description: projectForm.description || undefined,
        deadline: projectForm.deadline || undefined
      },
      invoice: {
        ...invoiceForm,
        total: Number(invoiceForm.total),
        dueDate: invoiceForm.dueDate || undefined
      }
    };

    try {
      const response = await fetch(routeMap[entity], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadMap[entity])
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Create request failed');
      }

      setMessage(`${entity.charAt(0).toUpperCase() + entity.slice(1)} created successfully.`);
      setLeadForm(leadFormDefaults);
      setClientForm(clientFormDefaults);
      setProjectForm(projectFormDefaults);
      setInvoiceForm(invoiceFormDefaults);
      refreshData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  async function handleDelete(entity: 'lead' | 'client' | 'project' | 'invoice', id: string) {
    try {
      const response = await fetch(`/api/${entity}s/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setMessage(`${entity.charAt(0).toUpperCase() + entity.slice(1)} deleted.`);
      refreshData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Delete failed.');
    }
  }

  return (
    <div className="p-6 md:p-8">
      <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">CRM dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Mobitech operations</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{userName}</span>
          <a href="/" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Site home</a>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Sign out</button>
          </form>
        </div>
      </header>

      {message ? (
        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Leads" value={analytics.leadCount} tone="blue" />
        <MetricCard label="Active clients" value={analytics.activeClients} tone="emerald" />
        <MetricCard label="Project value" value={`$${analytics.projectValue.toLocaleString()}`} tone="violet" />
        <MetricCard label="Revenue" value={`$${analytics.revenueTotal.toLocaleString()}`} tone="amber" />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-black text-slate-900">Pipeline performance</h2>
          <div className="flex h-48 items-end gap-3">
            {analytics.monthlyPipeline.map((point) => (
              <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end justify-center">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400"
                    style={{ height: `${point.value}%` }}
                    title={`${point.label}: ${point.value}%`}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500">{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-black text-slate-900">Service mix</h2>
          <div className="space-y-4">
            <ProgressRow label="Web products" value={82} color="bg-blue-600" />
            <ProgressRow label="Mobile apps" value={74} color="bg-emerald-500" />
            <ProgressRow label="Security upgrades" value={58} color="bg-violet-500" />
            <ProgressRow label="Support contracts" value={90} color="bg-amber-500" />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <FormCard
          title="Add lead"
          onSubmit={(e) => handleSubmit('lead', e)}
          fields={[
            { label: 'Name', name: 'name', value: leadForm.name, onChange: (value) => setLeadForm({ ...leadForm, name: value }), type: 'text' },
            { label: 'Email', name: 'email', value: leadForm.email, onChange: (value) => setLeadForm({ ...leadForm, email: value }), type: 'email' },
            { label: 'Company', name: 'company', value: leadForm.company, onChange: (value) => setLeadForm({ ...leadForm, company: value }), type: 'text' },
            { label: 'Phone', name: 'phone', value: leadForm.phone, onChange: (value) => setLeadForm({ ...leadForm, phone: value }), type: 'text' },
            { label: 'Source', name: 'source', value: leadForm.source, onChange: (value) => setLeadForm({ ...leadForm, source: value }), type: 'text' },
            { label: 'Notes', name: 'notes', value: leadForm.notes, onChange: (value) => setLeadForm({ ...leadForm, notes: value }), type: 'textarea' }
          ]}
          selectOptions={{
            status: {
              value: leadForm.status,
              onChange: (value) => setLeadForm({ ...leadForm, status: value }),
              options: ['new', 'qualified', 'proposal', 'won', 'lost']
            }
          }}
          submitLabel="Create lead"
        />

        <FormCard
          title="Add client"
          onSubmit={(e) => handleSubmit('client', e)}
          fields={[
            { label: 'Name', name: 'name', value: clientForm.name, onChange: (value) => setClientForm({ ...clientForm, name: value }), type: 'text' },
            { label: 'Company', name: 'company', value: clientForm.company, onChange: (value) => setClientForm({ ...clientForm, company: value }), type: 'text' },
            { label: 'Email', name: 'email', value: clientForm.email, onChange: (value) => setClientForm({ ...clientForm, email: value }), type: 'email' },
            { label: 'Phone', name: 'phone', value: clientForm.phone, onChange: (value) => setClientForm({ ...clientForm, phone: value }), type: 'text' },
            { label: 'Segment', name: 'segment', value: clientForm.segment, onChange: (value) => setClientForm({ ...clientForm, segment: value }), type: 'text' },
            { label: 'Project value', name: 'projectValue', value: clientForm.projectValue, onChange: (value) => setClientForm({ ...clientForm, projectValue: value }), type: 'number' }
          ]}
          selectOptions={{
            status: {
              value: clientForm.status,
              onChange: (value) => setClientForm({ ...clientForm, status: value }),
              options: ['active', 'prospect', 'paused', 'inactive']
            }
          }}
          submitLabel="Create client"
        />

        <FormCard
          title="Add project"
          onSubmit={(e) => handleSubmit('project', e)}
          fields={[
            { label: 'Project name', name: 'name', value: projectForm.name, onChange: (value) => setProjectForm({ ...projectForm, name: value }), type: 'text' },
            { label: 'Client name', name: 'clientName', value: projectForm.clientName, onChange: (value) => setProjectForm({ ...projectForm, clientName: value }), type: 'text' },
            { label: 'Value', name: 'value', value: projectForm.value, onChange: (value) => setProjectForm({ ...projectForm, value: value }), type: 'number' },
            { label: 'Deadline', name: 'deadline', value: projectForm.deadline, onChange: (value) => setProjectForm({ ...projectForm, deadline: value }), type: 'date' },
            { label: 'Description', name: 'description', value: projectForm.description, onChange: (value) => setProjectForm({ ...projectForm, description: value }), type: 'textarea' }
          ]}
          selectOptions={{
            status: {
              value: projectForm.status,
              onChange: (value) => setProjectForm({ ...projectForm, status: value }),
              options: ['planning', 'in-progress', 'review', 'completed']
            }
          }}
          submitLabel="Create project"
        />

        <FormCard
          title="Add invoice"
          onSubmit={(e) => handleSubmit('invoice', e)}
          fields={[
            { label: 'Client name', name: 'clientName', value: invoiceForm.clientName, onChange: (value) => setInvoiceForm({ ...invoiceForm, clientName: value }), type: 'text' },
            { label: 'Total', name: 'total', value: invoiceForm.total, onChange: (value) => setInvoiceForm({ ...invoiceForm, total: value }), type: 'number' },
            { label: 'Due date', name: 'dueDate', value: invoiceForm.dueDate, onChange: (value) => setInvoiceForm({ ...invoiceForm, dueDate: value }), type: 'date' }
          ]}
          selectOptions={{
            status: {
              value: invoiceForm.status,
              onChange: (value) => setInvoiceForm({ ...invoiceForm, status: value }),
              options: ['paid', 'pending', 'overdue']
            }
          }}
          submitLabel="Create invoice"
        />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <DatasetCard title="Leads" items={leads} onDelete={(id) => handleDelete('lead', id)} render={(lead) => (
          <div key={lead.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div>
              <p className="font-semibold text-slate-900">{lead.name}</p>
              <p className="text-sm text-slate-500">{lead.company || 'Independent lead'} • {lead.status}</p>
            </div>
            <button onClick={() => handleDelete('lead', lead.id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Delete</button>
          </div>
        )} />

        <DatasetCard title="Clients" items={clients} onDelete={(id) => handleDelete('client', id)} render={(client) => (
          <div key={client.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div>
              <p className="font-semibold text-slate-900">{client.company}</p>
              <p className="text-sm text-slate-500">{client.name} • {client.status}</p>
            </div>
            <button onClick={() => handleDelete('client', client.id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Delete</button>
          </div>
        )} />

        <DatasetCard title="Projects" items={projects} onDelete={(id) => handleDelete('project', id)} render={(project) => (
          <div key={project.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div>
              <p className="font-semibold text-slate-900">{project.name}</p>
              <p className="text-sm text-slate-500">{project.clientName} • {project.status}</p>
            </div>
            <button onClick={() => handleDelete('project', project.id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Delete</button>
          </div>
        )} />

        <DatasetCard title="Invoices" items={invoices} onDelete={(id) => handleDelete('invoice', id)} render={(invoice) => (
          <div key={invoice.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div>
              <p className="font-semibold text-slate-900">{invoice.clientName}</p>
              <p className="text-sm text-slate-500">{invoice.status} • ${Number(invoice.total).toFixed(2)}</p>
            </div>
            <button onClick={() => handleDelete('invoice', invoice.id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Delete</button>
          </div>
        )} />
      </section>

      {loading ? <div className="mt-6 text-sm text-slate-500">Loading records...</div> : null}
    </div>
  );
}

function MetricCard({ label, value, tone }: { label: string; value: string | number; tone: 'blue' | 'emerald' | 'violet' | 'amber' }) {
  const toneMap = {
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    violet: 'bg-violet-50 text-violet-700',
    amber: 'bg-amber-50 text-amber-700'
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-4 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${toneMap[tone]}`}>{label}</div>
      <p className="text-3xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function ProgressRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function FormCard({
  title,
  onSubmit,
  fields,
  selectOptions,
  submitLabel
}: {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  fields: { label: string; name: string; value: string; onChange: (value: string) => void; type: string }[];
  selectOptions?: Record<string, { value: string; onChange: (value: string) => void; options: string[] }>;
  submitLabel: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-black text-slate-900">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="mb-2 block text-sm font-medium text-slate-700">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                rows={4}
              />
            ) : (
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            )}
          </div>
        ))}

        {selectOptions
          ? Object.entries(selectOptions).map(([key, option]) => (
              <div key={key}>
                <label className="mb-2 block text-sm font-medium text-slate-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <select
                  value={option.value}
                  onChange={(e) => option.onChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  {option.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))
          : null}

        <button type="submit" className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">{submitLabel}</button>
      </form>
    </div>
  );
}

function DatasetCard({
  title,
  items,
  render
}: {
  title: string;
  items: Array<Record<string, unknown>>;
  render: (item: any) => React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-black text-slate-900">{title}</h2>
      <div className="space-y-3">
        {items.length === 0 ? <p className="text-sm text-slate-500">No {title.toLowerCase()} yet.</p> : items.map((item) => render(item))}
      </div>
    </div>
  );
}
