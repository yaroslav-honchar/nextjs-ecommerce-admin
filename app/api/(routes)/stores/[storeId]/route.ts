import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
import { IDValidator } from "@/app/api/lib/id-validator"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Update an existed store
export const PATCH = exceptionFilter(
  "STORE",
  "PATCH",
  authGuard(
    IDValidator<IPropsWithStoreidParam>(
      async (req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam): Promise<NextResponse> => {
        const userId = auth().userId as string
        const { name } = await req.json()
        if (!name) {
          return new NextResponse("Name is required", { status: 400 })
        }

        const store = await prismadb.store.updateMany({
          where: {
            id: storeId,
            userId,
          },
          data: {
            name,
          },
        })

        return new NextResponse(JSON.stringify(store), { status: 200 })
      },
    ),
  ),
)

// Delete an existed store
export const DELETE = exceptionFilter(
  "STORE",
  "DELETE",
  authGuard(
    IDValidator<IPropsWithStoreidParam>(async (_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) => {
      const userId = auth().userId as string

      const store = await prismadb.store.deleteMany({
        where: {
          id: storeId,
          userId,
        },
      })

      return new NextResponse(JSON.stringify(store), { status: 200 })
    }),
  ),
)
