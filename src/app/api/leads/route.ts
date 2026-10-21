import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  source: z.string().optional().or(z.literal('')),
  status: z.enum(['new', 'qualified', 'proposal', 'won', 'lost']).default('new'),
  notes: z.string().optional().or(z.literal(''))
});

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        phone: parsed.data.phone || null,
        source: parsed.data.source || null,
        status: parsed.data.status,
        notes: parsed.data.notes || null
      }
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json({ error: 'Unable to create lead.' }, { status: 500 });
  }
}
