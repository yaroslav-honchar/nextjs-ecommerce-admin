import type Stripe from "stripe"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { stripeConfig } from "@/configs/stripe.config"
import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export const POST = exceptionFilter("WEBHOOK", "POST", async (req: Request) => {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string
  const stripeWebhookKey = stripeConfig("STRIPE_WEBHOOK_KEY")

  const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookKey)

  const session = event.data.object as Stripe.Checkout.Session
  const address = session.customer_details?.address
  const addressComponents = [address?.line1, address?.line2, address?.city, address?.state, address?.postal_code]
  const addressString = addressComponents.filter((component: string | null | undefined) => !!component).join(", ")

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    })

    const productIds = order.orderItems.map((orderItem) => orderItem.productId)

    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    })
  }

  return new NextResponse(null, { status: 200 })
})
