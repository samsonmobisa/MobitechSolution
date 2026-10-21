import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: {
        clientName: body.clientName,
        total: body.total,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : null
      }
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error('Invoice update error:', error);
    return NextResponse.json({ error: 'Unable to update invoice.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.invoice.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Invoice delete error:', error);
    return NextResponse.json({ error: 'Unable to delete invoice.' }, { status: 500 });
  }
}
