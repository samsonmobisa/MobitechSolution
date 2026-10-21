import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please provide a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message
      }
    });

    return NextResponse.json({ success: true, message: contact }, { status: 201 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Unable to save your message.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
