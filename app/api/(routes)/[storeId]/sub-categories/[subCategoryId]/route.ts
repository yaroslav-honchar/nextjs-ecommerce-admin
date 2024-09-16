import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import prismadb from "@/lib/prismadb"
import { subCategorySchema } from "@/schemas/sub-category.schema"
import type { IPropsWithStoreidSubCategoryidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a subcategory of a store
export const GET = exceptionFilter(
  "CATEGORY",
  "GET",
  IDValidator<IPropsWithStoreidSubCategoryidParam>(
    async (_req: NextRequest, { params: { storeId, subCategoryId } }: IPropsWithStoreidSubCategoryidParam) => {
      const subCategory = await prismadb.subCategory.findUnique({
        where: { storeId, id: subCategoryId },
        include: { category: true, meta: true },
      })

      return new NextResponse(JSON.stringify(subCategory), { status: 200 })
    },
  ),
)

// Update a subcategory of a store
export const PATCH = exceptionFilter(
  "CATEGORY",
  "PATCH",
  authGuard(
    IDValidator<IPropsWithStoreidSubCategoryidParam>(
      async (req: NextRequest, { params: { storeId, subCategoryId } }: IPropsWithStoreidSubCategoryidParam) => {
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

        const data = subCategorySchema.parse(await req.json())

        const subCategory = await prismadb.subCategory.update({
          where: { id: subCategoryId, storeId },
          data: {
            categoryId: data.categoryId,
            name: data.name,
            storeId,
          },
        })

        await prismadb.metaInformation.update({
          where: { id: subCategory.metaId, storeId },
          data: {
            ...data.meta,
            storeId,
          },
        })

        return new NextResponse(JSON.stringify(subCategory), { status: 200 })
      },
    ),
  ),
)

// Delete a subcategory of a store
export const DELETE = exceptionFilter(
  "CATEGORY",
  "DELETE",
  authGuard(
    IDValidator<IPropsWithStoreidSubCategoryidParam>(
      async (_req: NextRequest, { params: { storeId, subCategoryId } }: IPropsWithStoreidSubCategoryidParam) => {
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

        const subCategory = await prismadb.subCategory.delete({
          where: { id: subCategoryId, storeId },
        })

        return new NextResponse(JSON.stringify(subCategory), { status: 200 })
      },
    ),
  ),
)
