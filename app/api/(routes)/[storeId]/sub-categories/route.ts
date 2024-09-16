import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import { generateSlug } from "@/lib/generate-slug"
import prismadb from "@/lib/prismadb"
import { subCategorySchema } from "@/schemas/sub-category.schema"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all subcategories of a store
export const GET = exceptionFilter(
  "SUB-CATEGORIES",
  "GET",
  IDValidator<IPropsWithStoreidParam>(async (_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
    const subCategories = await prismadb.subCategory.findMany({
      where: { storeId },
      include: { category: true },
    })

    return new NextResponse(JSON.stringify(subCategories), { status: 200 })
  }),
)

// Create a new subcategory for a store
export const POST = exceptionFilter(
  "SUB-CATEGORIES",
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

      const data = subCategorySchema.parse(await req.json())

      const meta = await prismadb.metaInformation.create({
        data: {
          ...data.meta,
          storeId,
        },
      })

      const subCategoryWithoutSlug = await prismadb.subCategory.create({
        data: {
          categoryId: data.categoryId,
          name: data.name,
          storeId,
          metaId: meta.id,
        },
      })

      const subCategory = await prismadb.subCategory.update({
        where: {
          id: subCategoryWithoutSlug.id,
          storeId,
        },
        data: {
          slug: generateSlug(subCategoryWithoutSlug.name, subCategoryWithoutSlug.id),
        },
      })

      return new NextResponse(JSON.stringify(subCategory), { status: 201 })
    }),
  ),
)
