import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import { IDValidator } from "@/app/api/_utils/id-validator/id-validator"
import prismadb from "@/lib/prismadb"
import { billboardSchema } from "@/schemas/billboard.schema"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all billboards of a store
export const GET = exceptionFilter(
  "BILLBOARDS",
  "GET",
  IDValidator<IPropsWithStoreidParam>(async (_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
    const billboards = await prismadb.billboard.findMany({
      where: { storeId },
    })

    return new NextResponse(JSON.stringify(billboards), { status: 200 })
  }),
)

// Create a new billboard for a store
export const POST = exceptionFilter(
  "BILLBOARDS",
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

      const data = billboardSchema.parse(await req.json())

      const billboard = await prismadb.billboard.create({
        data: {
          ...data,
          storeId,
        },
      })

      return new NextResponse(JSON.stringify(billboard), { status: 201 })
    }),
  ),
)
