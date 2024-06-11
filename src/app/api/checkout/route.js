import Stripe from "stripe";
import { NextResponse } from "next/server";

export const config = {
  api: {
    externalResolver: true,
  },
  runtime: "edge"
}

export default async function POST (request) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let data = await request.json();
    let priceId = data.priceId
    let priceNickname = data.priceNickname
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
      custom_fields: [
        {
          key: 'specific_request',
          label: {
            type: 'custom',
            custom: 'Your specific request (be creative and detailed!):',
          },
          type: 'text',
        },
      ],
      metadata: {
        nickname: priceNickname
      },
      mode: 'payment',
      success_url: `${baseUrl}/payment-success`,
      cancel_url: `${baseUrl}/place-commission`
    })

    return NextResponse.json(session.url)
}