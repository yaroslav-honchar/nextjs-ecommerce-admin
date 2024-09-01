import type { IPropsWithStoreidBillboardidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { billboardDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/components/billboard-form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a billboard of a store
export const GET = exceptionFilter(
  "BILLBOARD",
  "GET",
  IDValidator<IPropsWithStoreidBillboardidParam>(
    async (_req: NextRequest, { params: { storeId, billboardId } }: IPropsWithStoreidBillboardidParam) => {
      const billboard = await prismadb.billboard.findUnique({
        where: { storeId, id: billboardId },
      })

      return new NextResponse(JSON.stringify(billboard), { status: 200 })
    },
  ),
)

// Update a billboard of a store
export const PATCH = exceptionFilter(
  "BILLBOARD",
  "PATCH",
  authGuard(
    IDValidator<IPropsWithStoreidBillboardidParam>(
      async (req: NextRequest, { params: { storeId, billboardId } }: IPropsWithStoreidBillboardidParam) => {
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

        const data = billboardDataSchema.parse(await req.json())

        const billboard = await prismadb.billboard.update({
          where: { id: billboardId, storeId },
          data,
        })

        return new NextResponse(JSON.stringify(billboard), { status: 200 })
      },
    ),
  ),
)

// Delete a billboard of a store
export const DELETE = exceptionFilter(
  "BILLBOARD",
  "DELETE",
  authGuard(
    IDValidator<IPropsWithStoreidBillboardidParam>(
      async (_req: NextRequest, { params: { storeId, billboardId } }: IPropsWithStoreidBillboardidParam) => {
        const billboard = await prismadb.billboard.delete({
          where: {
            id: billboardId,
            storeId,
          },
        })

        return new NextResponse(JSON.stringify(billboard), { status: 200 })
      },
    ),
  ),
)
