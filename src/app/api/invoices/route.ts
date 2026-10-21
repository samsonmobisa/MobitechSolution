import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const invoiceSchema = z.object({
  clientName: z.string().min(2),
  total: z.coerce.number().min(0),
  status: z.enum(['paid', 'pending', 'overdue']).default('pending'),
  dueDate: z.string().optional().or(z.literal(''))
});

export async function GET() {
  const invoices = await prisma.invoice.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = invoiceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const invoice = await prisma.invoice.create({
      data: {
        clientName: parsed.data.clientName,
        total: parsed.data.total,
        status: parsed.data.status,
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null
      }
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Invoice creation error:', error);
    return NextResponse.json({ error: 'Unable to create invoice.' }, { status: 500 });
  }
}
