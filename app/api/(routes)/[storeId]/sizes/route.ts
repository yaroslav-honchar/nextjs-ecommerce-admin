import { sizeDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/components/form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all sizes of a store
export const GET = exceptionFilter(
  "SIZES",
  "GET",
  IDValidator<IPropsWithStoreidParam>(async (_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
    const sizes = await prismadb.size.findMany({
      where: { storeId },
    })

    return new NextResponse(JSON.stringify(sizes), { status: 200 })
  }),
)

// Create a new size for a store
export const POST = exceptionFilter(
  "SIZES",
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

      const data = sizeDataSchema.parse(await req.json())

      const size = await prismadb.size.create({
        data: {
          ...data,
          storeId,
        },
      })

      return new NextResponse(JSON.stringify(size), { status: 201 })
    }),
  ),
)
