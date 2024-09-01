import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { categoryDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/components/category-form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all categories of a store
export const GET = exceptionFilter(
  "CATEGORIES",
  "GET",
  IDValidator<IPropsWithStoreidParam>(async (_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
    const categories = await prismadb.category.findMany({
      where: { storeId },
    })

    return new NextResponse(JSON.stringify(categories), { status: 200 })
  }),
)

// Create a new category for a store
export const POST = exceptionFilter(
  "CATEGORIES",
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

      const data = categoryDataSchema.parse(await req.json())

      const category = await prismadb.category.create({
        data: {
          ...data,
          storeId,
        },
      })

      return new NextResponse(JSON.stringify(category), { status: 201 })
    }),
  ),
)
