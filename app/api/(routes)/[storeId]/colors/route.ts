import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { colorDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all colors of a store
export const GET = exceptionFilter(
  "COLOR",
  "GET",
  IDValidator<IPropsWithStoreidParam>(async (_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
    const colors = await prismadb.color.findMany({
      where: { storeId },
    })

    return new NextResponse(JSON.stringify(colors), { status: 200 })
  }),
)

// Create a new color for a store
export const POST = exceptionFilter(
  "COLOR",
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

      const data = colorDataSchema.parse(await req.json())

      const color = await prismadb.color.create({
        data: {
          ...data,
          storeId,
        },
      })

      return new NextResponse(JSON.stringify(color), { status: 201 })
    }),
  ),
)
