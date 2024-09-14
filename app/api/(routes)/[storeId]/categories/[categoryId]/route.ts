import { categoryDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/_components/form.schema"
import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidCategoryidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a category of a store
export const GET = exceptionFilter(
  "CATEGORY",
  "GET",
  IDValidator<IPropsWithStoreidCategoryidParam>(
    async (_req: NextRequest, { params: { storeId, categoryId } }: IPropsWithStoreidCategoryidParam) => {
      const category = await prismadb.category.findUnique({
        where: { storeId, id: categoryId },
        include: { billboard: true, sizes: true, subCategories: true },
      })

      return new NextResponse(JSON.stringify(category), { status: 200 })
    },
  ),
)

// Update a category of a store
export const PATCH = exceptionFilter(
  "CATEGORY",
  "PATCH",
  authGuard(
    IDValidator<IPropsWithStoreidCategoryidParam>(
      async (req: NextRequest, { params: { storeId, categoryId } }: IPropsWithStoreidCategoryidParam) => {
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

        const data = categoryDataSchema.parse(await req.json())

        const category = await prismadb.category.update({
          where: { id: categoryId, storeId },
          data,
        })

        return new NextResponse(JSON.stringify(category), { status: 200 })
      },
    ),
  ),
)

// Delete a category of a store
export const DELETE = exceptionFilter(
  "CATEGORY",
  "DELETE",
  authGuard(
    IDValidator<IPropsWithStoreidCategoryidParam>(
      async (_req: NextRequest, { params: { storeId, categoryId } }: IPropsWithStoreidCategoryidParam) => {
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

        const category = await prismadb.category.delete({
          where: { id: categoryId, storeId },
        })

        return new NextResponse(JSON.stringify(category), { status: 200 })
      },
    ),
  ),
)
