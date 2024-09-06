import { productDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidProductidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a product of a store
export const GET = exceptionFilter(
  "PRODUCT",
  "GET",
  IDValidator<IPropsWithStoreidProductidParam>(
    async (_req: NextRequest, { params: { storeId, productId } }: IPropsWithStoreidProductidParam) => {
      const product = await prismadb.product.findUnique({
        where: { storeId, id: productId },
        include: {
          images: true,
          color: true,
          size: true,
          category: true,
        },
      })

      return new NextResponse(JSON.stringify(product), { status: 200 })
    },
  ),
)

// Update a product of a store
export const PATCH = exceptionFilter(
  "PRODUCT",
  "PATCH",
  authGuard(
    IDValidator<IPropsWithStoreidProductidParam>(
      async (req: NextRequest, { params: { storeId, productId } }: IPropsWithStoreidProductidParam) => {
        const userId = auth().userId as string

        const storeByUserId = await prismadb.store.findFirst({
          where: {
            id: storeId,
            userId,
          },
        })

        if (!storeByUserId) {
          return new NextResponse("Unauthorized", { status: 403 })
        }

        const data = productDataSchema.parse(await req.json())

        await prismadb.product.update({
          where: { id: productId, storeId },
          data: {
            ...data,
            images: {
              deleteMany: {},
            },
          },
        })

        const product = await prismadb.product.update({
          where: { id: productId, storeId },
          data: {
            images: {
              createMany: {
                data: data.images,
              },
            },
          },
        })

        return new NextResponse(JSON.stringify(product), { status: 200 })
      },
    ),
  ),
)

// Delete a product of a store
export const DELETE = exceptionFilter(
  "PRODUCT",
  "DELETE",
  authGuard(
    IDValidator<IPropsWithStoreidProductidParam>(
      async (_req: NextRequest, { params: { storeId, productId } }: IPropsWithStoreidProductidParam) => {
        const userId = auth().userId as string

        const storeByUserId = await prismadb.store.findFirst({
          where: {
            id: storeId,
            userId,
          },
        })

        if (!storeByUserId) {
          return new NextResponse("Unauthorized", { status: 403 })
        }

        const product = await prismadb.product.delete({
          where: { id: productId, storeId },
        })

        return new NextResponse(JSON.stringify(product), { status: 200 })
      },
    ),
  ),
)
