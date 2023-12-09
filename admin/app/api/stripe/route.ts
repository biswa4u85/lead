import { NextResponse } from 'next/server'
import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const paymentIntent = await stripe.paymentIntents.create({ ...data, amount: data.amount * 100 });
        const clientSecret = paymentIntent?.client_secret
        return NextResponse.json(clientSecret);
    } catch (error: any) {
        return NextResponse.json({ error: true, message: error?.raw?.message })
    }
}