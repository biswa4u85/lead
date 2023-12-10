import { NextRequest } from 'next/server'
import Stripe from 'stripe';
import { successResponse, errorResponse } from "@/libs/utility";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const paymentIntent = await stripe.paymentIntents.create({ ...data, amount: data.amount * 100 });
        const clientSecret = paymentIntent?.client_secret
        return successResponse(clientSecret);
    } catch (error: any) {
        return errorResponse(error?.raw?.message);
    }
}