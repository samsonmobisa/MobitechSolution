import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20'
});

export async function POST(request: Request) {
  try {
    const { planName, amount } = await request.json();

    if (!planName || !amount || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Invalid checkout payload.' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${planName} plan`
            },
            unit_amount: Number(amount)
          },
          quantity: 1
        }
      ],
      success_url: `${origin}/dashboard?payment=success`,
      cancel_url: `${origin}/pricing?payment=cancelled`
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Stripe checkout is not configured. Add your secret key.' }, { status: 500 });
  }
}
