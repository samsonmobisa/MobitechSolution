import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        name: body.name,
        email: body.email,
        company: body.company || null,
        phone: body.phone || null,
        source: body.source || null,
        status: body.status,
        notes: body.notes || null
      }
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Lead update error:', error);
    return NextResponse.json({ error: 'Unable to update lead.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.lead.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead delete error:', error);
    return NextResponse.json({ error: 'Unable to delete lead.' }, { status: 500 });
  }
}
