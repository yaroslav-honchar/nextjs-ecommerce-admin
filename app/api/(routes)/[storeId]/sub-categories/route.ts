import slug from "slug"
import { subCategoryDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/sub-categories/[subCategoryId]/components/form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all sub categories of a store
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

// Create a new sub category for a store
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

      const data = subCategoryDataSchema.parse(await req.json())

      const subCategoryWithoutSlug = await prismadb.subCategory.create({
        data: {
          ...data,
          storeId,
        },
      })

      const subCategory = await prismadb.subCategory.update({
        where: {
          id: subCategoryWithoutSlug.id,
          storeId,
        },
        data: {
          slug: `${slug(subCategoryWithoutSlug.name)}-${subCategoryWithoutSlug.id}`,
        },
      })

      return new NextResponse(JSON.stringify(subCategory), { status: 201 })
    }),
  ),
)
