import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hash('admin12345', 12);

  await prisma.user.upsert({
    where: { email: 'admin@mobitechsolution.com' },
    update: { name: 'Mobitech Admin', passwordHash: adminPassword, role: 'admin' },
    create: {
      name: 'Mobitech Admin',
      email: 'admin@mobitechsolution.com',
      passwordHash: adminPassword,
      role: 'admin'
    }
  });

  await prisma.lead.deleteMany();
  await prisma.client.deleteMany();
  await prisma.project.deleteMany();
  await prisma.invoice.deleteMany();

  const leads = [
    {
      name: 'Aisha Njeri',
      email: 'aisha@greenline.co.ke',
      company: 'Greenline Retail',
      phone: '+254712345001',
      source: 'Website',
      status: 'qualified',
      notes: 'Needs a mobile commerce app and customer loyalty flow.'
    },
    {
      name: 'Michael Otieno',
      email: 'michael@lumisafrica.com',
      company: 'Lumis Africa',
      phone: '+254711223344',
      source: 'LinkedIn',
      status: 'proposal',
      notes: 'Looking to improve customer onboarding and support automation.'
    },
    {
      name: 'Grace Mwangi',
      email: 'grace@skytrail.ng',
      company: 'Skytrail Logistics',
      phone: '+2348099887766',
      source: 'Referral',
      status: 'new',
      notes: 'Interested in route tracking and fleet dashboards.'
    }
  ];

  const clients = [
    {
      name: 'Aisha Njeri',
      company: 'Greenline Retail',
      email: 'aisha@greenline.co.ke',
      phone: '+254712345001',
      status: 'active',
      segment: 'Retail',
      projectValue: 24000
    },
    {
      name: 'Brian Otieno',
      company: 'YomaPay',
      email: 'brian@yomapay.co',
      phone: '+254722991000',
      status: 'active',
      segment: 'Fintech',
      projectValue: 36000
    },
    {
      name: 'Nadia Kibet',
      company: 'Atlas Energy',
      email: 'nadia@atlasenergy.africa',
      phone: '+254733654321',
      status: 'prospect',
      segment: 'Energy',
      projectValue: 18500
    }
  ];

  const projects = [
    {
      name: 'Greenline Mobile Commerce',
      clientName: 'Greenline Retail',
      status: 'in-progress',
      value: 24000,
      deadline: new Date('2026-12-15T00:00:00.000Z'),
      description: 'Customer storefront and mobile-first shopping experience.'
    },
    {
      name: 'YomaPay Dashboard',
      clientName: 'YomaPay',
      status: 'review',
      value: 36000,
      deadline: new Date('2026-11-30T00:00:00.000Z'),
      description: 'Analytics dashboard and transaction visibility tools.'
    },
    {
      name: 'Atlas Energy Portal',
      clientName: 'Atlas Energy',
      status: 'planning',
      value: 18500,
      deadline: new Date('2027-01-18T00:00:00.000Z'),
      description: 'Client portal for field reporting and operational insights.'
    }
  ];

  const invoices = [
    {
      clientName: 'Greenline Retail',
      total: 8500,
      status: 'paid',
      dueDate: new Date('2026-10-20T00:00:00.000Z')
    },
    {
      clientName: 'YomaPay',
      total: 16400,
      status: 'pending',
      dueDate: new Date('2026-10-28T00:00:00.000Z')
    },
    {
      clientName: 'Atlas Energy',
      total: 6200,
      status: 'overdue',
      dueDate: new Date('2026-10-09T00:00:00.000Z')
    }
  ];

  await prisma.lead.createMany({ data: leads });
  await prisma.client.createMany({ data: clients });
  await prisma.project.createMany({ data: projects });
  await prisma.invoice.createMany({ data: invoices });

  console.log('Database seeded with Mobitech demo data.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Seed failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
