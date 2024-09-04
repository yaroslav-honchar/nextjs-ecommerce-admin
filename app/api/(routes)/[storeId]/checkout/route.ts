import { ObjectId } from "bson"
import type Stripe from "stripe"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import { clientAppUrlConfig } from "@/configs/client-app-url.config"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const POST = exceptionFilter(
  "CHECKOUT",
  "POST",
  IDValidator<IPropsWithStoreidParam>(async (req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
    const { productIds } = (await req.json()) as { productIds: string[] | undefined }
    if (!productIds) {
      return new NextResponse("Products IDs is required", { status: 400 })
    }

    const incorrectIdIs = productIds.filter((id: string): boolean => !ObjectId.isValid(id))
    if (incorrectIdIs.length > 0) {
      return new NextResponse(`Next IDs is incorrect: ${incorrectIdIs.join(",")}`, { status: 400 })
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId,
        id: {
          in: productIds,
        },
      },
    })

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    products.forEach((product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
      })
    })

    const order = await prismadb.order.create({
      data: {
        storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    })

    const clientAppUrl = clientAppUrlConfig()

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${clientAppUrl}/cart?success=1`,
      cancel_url: `${clientAppUrl}/cart?cancelled=1`,
      metadata: {
        orderId: order.id,
      },
    })

    return new NextResponse(JSON.stringify({ url: session.url }))
  }),
)
