import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import prismadb from "@/lib/prismadb"
import { colorSchema } from "@/schemas/color.schema"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
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

      const data = colorSchema.parse(await req.json())

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
