import { colorDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidColoridParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a color of a store
export const GET = exceptionFilter(
  "COLOR",
  "GET",
  IDValidator<IPropsWithStoreidColoridParam>(
    async (_req: NextRequest, { params: { storeId, colorId } }: IPropsWithStoreidColoridParam) => {
      const color = await prismadb.color.findUnique({
        where: { storeId, id: colorId },
      })

      return new NextResponse(JSON.stringify(color), { status: 200 })
    },
  ),
)

// Update a color of a store
export const PATCH = exceptionFilter(
  "COLOR",
  "PATCH",
  authGuard(
    IDValidator<IPropsWithStoreidColoridParam>(
      async (req: NextRequest, { params: { storeId, colorId } }: IPropsWithStoreidColoridParam) => {
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

        const data = colorDataSchema.parse(await req.json())

        const color = await prismadb.color.update({
          where: { id: colorId, storeId },
          data,
        })

        return new NextResponse(JSON.stringify(color), { status: 200 })
      },
    ),
  ),
)

// Delete a color of a store
export const DELETE = exceptionFilter(
  "COLOR",
  "DELETE",
  authGuard(
    IDValidator<IPropsWithStoreidColoridParam>(
      async (_req: NextRequest, { params: { storeId, colorId } }: IPropsWithStoreidColoridParam) => {
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

        const color = await prismadb.color.delete({
          where: { id: colorId, storeId },
        })

        return new NextResponse(JSON.stringify(color), { status: 200 })
      },
    ),
  ),
)
