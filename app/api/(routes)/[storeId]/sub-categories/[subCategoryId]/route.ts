import { subCategoryDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/sub-categories/[subCategoryId]/components/form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidSubCategoryidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a category of a store
export const GET = exceptionFilter(
  "CATEGORY",
  "GET",
  IDValidator<IPropsWithStoreidSubCategoryidParam>(
    async (_req: NextRequest, { params: { storeId, subCategoryId } }: IPropsWithStoreidSubCategoryidParam) => {
      const subCategory = await prismadb.subCategory.findUnique({
        where: { storeId, id: subCategoryId },
        include: { category: true },
      })

      return new NextResponse(JSON.stringify(subCategory), { status: 200 })
    },
  ),
)

// Update a category of a store
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

        const data = subCategoryDataSchema.parse(await req.json())

        const subCategory = await prismadb.subCategory.update({
          where: { id: subCategoryId, storeId },
          data,
        })

        return new NextResponse(JSON.stringify(subCategory), { status: 200 })
      },
    ),
  ),
)

// Delete a category of a store
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
