import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const client = await prisma.client.update({
      where: { id: params.id },
      data: {
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone || null,
        status: body.status,
        segment: body.segment || null,
        projectValue: body.projectValue ?? null
      }
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error('Client update error:', error);
    return NextResponse.json({ error: 'Unable to update client.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.client.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Client delete error:', error);
    return NextResponse.json({ error: 'Unable to delete client.' }, { status: 500 });
  }
}
