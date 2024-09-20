import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import prismadb from "@/lib/prismadb"
import { productSchema } from "@/schemas/product.schema"
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
          subcategory: true,
          meta: true,
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

        const data = productSchema.parse(await req.json())

        await prismadb.product.update({
          where: { id: productId, storeId },
          data: {
            name: data.name,
            description: data.description,
            price: data.price,
            isArchived: data.isArchived,
            isFeatured: data.isFeatured,
            sizeId: data.sizeId,
            colorId: data.colorId,
            categoryId: data.categoryId,
            subcategoryId: data.subcategoryId,
            storeId,
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

        await prismadb.metaInformation.update({
          where: { id: product.metaId, storeId },
          data: {
            ...data.meta,
            storeId,
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
