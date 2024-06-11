import Stripe from "stripe";
import { NextResponse } from "next/server";

export const config = {
  api: {
    externalResolver: true,
  },
  runtime: "edge"
}

// might not be needed as will have constant amount of products
export default async function GET(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const prices = await stripe.prices.list({
        active: true,
        limit: 4,
    });

    return NextResponse.json(prices.data)
}