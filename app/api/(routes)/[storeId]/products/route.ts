import { productDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import { generateSlug } from "@/lib/generate-slug"
import prismadb from "@/lib/prismadb"
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
        images: true,
        category: true,
        color: true,
        size: true,
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

      const data = productDataSchema.parse(await req.json())

      const productWithoutSlug = await prismadb.product.create({
        data: {
          ...data,
          images: {
            createMany: {
              data: data.images,
            },
          },
          storeId,
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

      return new NextResponse(JSON.stringify(product), { status: 201 })
    }),
  ),
)
