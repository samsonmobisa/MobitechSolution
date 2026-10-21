import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const projectSchema = z.object({
  name: z.string().min(2),
  clientName: z.string().min(2),
  status: z.enum(['planning', 'in-progress', 'review', 'completed']).default('in-progress'),
  value: z.coerce.number().optional().nullable().default(null),
  deadline: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal(''))
});

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name: parsed.data.name,
        clientName: parsed.data.clientName,
        status: parsed.data.status,
        value: parsed.data.value ?? null,
        deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : null,
        description: parsed.data.description || null
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json({ error: 'Unable to create project.' }, { status: 500 });
  }
}
