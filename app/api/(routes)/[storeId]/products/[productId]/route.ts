import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import { generateSlug } from "@/lib/generate-slug"
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
          category: true,
          subcategory: true,
          meta: true,
          variants: {
            include: {
              color: true,
              sizes: true,
              images: true,
            },
          },
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

        const productWithOldSlug = await prismadb.product.update({
          where: { id: productId, storeId },
          data: {
            name: data.name,
            description: data.description,
            price: data.price,
            isArchived: data.isArchived,
            isFeatured: data.isFeatured,
            categoryId: data.categoryId,
            subcategoryId: data.subcategoryId,
            storeId,
            stock: data.variants.reduce((acc, variant) => acc + variant.stock, 0),
            variants: {
              deleteMany: {},
            },
          },
        })

        const product = await prismadb.product.update({
          where: {
            id: productWithOldSlug.id,
            storeId,
          },
          data: {
            slug: generateSlug(productWithOldSlug.name, productWithOldSlug.id),
            variants: {
              createMany: {
                data: data.variants.map((variant) => ({
                  storeId,
                  colorId: variant.colorId,
                  sizeIds: variant.sizeIds,
                  stock: variant.stock,
                  images: {
                    createMany: {
                      data: variant.images,
                    },
                  },
                })),
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

        await prismadb.productVariant.deleteMany({
          where: {
            productId: productId,
          },
        })

        const product = await prismadb.product.delete({
          where: { id: productId, storeId },
        })

        return new NextResponse(JSON.stringify(product), { status: 200 })
      },
    ),
  ),
)
