import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import prismadb from "@/lib/prismadb"
import { sizeSchema } from "@/schemas/size.schema"
import type { IPropsWithStoreidSizeidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a size of a store
export const GET = exceptionFilter(
  "SIZE",
  "GET",
  IDValidator<IPropsWithStoreidSizeidParam>(
    async (_req: NextRequest, { params: { storeId, sizeId } }: IPropsWithStoreidSizeidParam) => {
      const size = await prismadb.size.findUnique({
        where: { storeId, id: sizeId },
      })

      return new NextResponse(JSON.stringify(size), { status: 200 })
    },
  ),
)

// Update a size of a store
export const PATCH = exceptionFilter(
  "SIZE",
  "PATCH",
  authGuard(
    IDValidator<IPropsWithStoreidSizeidParam>(
      async (req: NextRequest, { params: { storeId, sizeId } }: IPropsWithStoreidSizeidParam) => {
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

        const data = sizeSchema.parse(await req.json())

        const size = await prismadb.size.update({
          where: { id: sizeId, storeId },
          data,
        })

        return new NextResponse(JSON.stringify(size), { status: 200 })
      },
    ),
  ),
)

// Delete a size of a store
export const DELETE = exceptionFilter(
  "SIZE",
  "DELETE",
  authGuard(
    IDValidator<IPropsWithStoreidSizeidParam>(
      async (_req: NextRequest, { params: { storeId, sizeId } }: IPropsWithStoreidSizeidParam) => {
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

        const size = await prismadb.size.delete({
          where: { id: sizeId, storeId },
        })

        return new NextResponse(JSON.stringify(size), { status: 200 })
      },
    ),
  ),
)
