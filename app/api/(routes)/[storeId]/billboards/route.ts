import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
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

      const { label, imageUrl } = await req.json()
      if (!label) {
        return new NextResponse("Label is required", { status: 400 })
      }

      if (!imageUrl) {
        return new NextResponse("Image url is required", { status: 400 })
      }

      const billboard = await prismadb.billboard.create({
        data: {
          label,
          imageUrl,
          storeId,
        },
      })

      return new NextResponse(JSON.stringify(billboard), { status: 201 })
    }),
  ),
)
