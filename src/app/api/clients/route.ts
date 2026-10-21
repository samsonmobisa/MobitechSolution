import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const clientSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal('')),
  status: z.enum(['active', 'prospect', 'paused', 'inactive']).default('active'),
  segment: z.string().optional().or(z.literal('')),
  projectValue: z.coerce.number().optional().nullable().default(null)
});

export async function GET() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = clientSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        name: parsed.data.name,
        company: parsed.data.company,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        status: parsed.data.status,
        segment: parsed.data.segment || null,
        projectValue: parsed.data.projectValue ?? null
      }
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Client creation error:', error);
    return NextResponse.json({ error: 'Unable to create client.' }, { status: 500 });
  }
}
