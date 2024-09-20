import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import { generateSlug } from "@/lib/generate-slug"
import prismadb from "@/lib/prismadb"
import { productSchema } from "@/schemas/product.schema"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all products of a store
export const GET = exceptionFilter(
  "PRODUCTS",
  "GET",
  IDValidator<IPropsWithStoreidParam>(async (req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
    const searchParams = new URLSearchParams(req.url.split("?")[1])

    const colorParam = searchParams.getAll("colorId") || []
    const colorId = colorParam.length > 0 ? colorParam : undefined

    const sizeParam = searchParams.getAll("sizeId") || []
    const sizeId = sizeParam.length > 0 ? sizeParam : undefined

    const categoryId = searchParams.get("categoryId") || undefined
    const isFeatured = searchParams.get("isFeatured")

    const products = await prismadb.product.findMany({
      where: {
        storeId,
        categoryId,
        ...(colorId ? { colorId: { in: colorId } } : {}),
        ...(sizeId ? { sizeId: { in: sizeId } } : {}),
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        variants: {
          include: {
            color: true,
            sizes: true,
            images: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return new NextResponse(JSON.stringify(products), { status: 200 })
  }),
)

// Create a new product for a store
export const POST = exceptionFilter(
  "PRODUCTS",
  "POST",
  authGuard(
    IDValidator<IPropsWithStoreidParam>(async (req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
      const userId = auth().userId as string

      const storeByUserId = await prismadb.store.findFirst({
        where: { id: storeId, userId },
      })

      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 403 })
      }

      const data = productSchema.parse(await req.json())

      const meta = await prismadb.metaInformation.create({
        data: {
          ...data.meta,
          storeId,
        },
      })

      const productWithoutSlug = await prismadb.product.create({
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
          metaId: meta.id,
        },
      })

      const product = await prismadb.product.update({
        where: {
          id: productWithoutSlug.id,
          storeId,
        },
        data: {
          slug: generateSlug(productWithoutSlug.name, productWithoutSlug.id),
        },
      })

      const variants = await Promise.all(
        data.variants.map((variant) =>
          prismadb.productVariant.create({
            data: {
              storeId,
              colorId: variant.colorId,
              sizeIds: variant.sizeIds,
              stock: variant.stock,
              productId: productWithoutSlug.id,
            },
          }),
        ),
      )

      await Promise.all(
        variants.map((variant, index) =>
          prismadb.image.createMany({
            data: data.variants[index].images.map((image) => ({
              url: image.url,
              productVariantId: variant.id,
            })),
          }),
        ),
      )

      return new NextResponse(JSON.stringify(product), { status: 201 })
    }),
  ),
)
