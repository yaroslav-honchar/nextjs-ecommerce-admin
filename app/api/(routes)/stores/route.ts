import { storeDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/settings/_components/form.schema"
import { authGuard } from "@/app/api/_utils/auth-guard/auth-guard"
import { exceptionFilter } from "@/app/api/_utils/exception-filter/exception-filter"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Create a new store
export const POST = exceptionFilter(
  "STORES",
  "POST",
  authGuard(async (req: NextRequest) => {
    const data = storeDataSchema.parse(await req.json())

    const userId = auth().userId as string

    const store = await prismadb.store.create({
      data: { ...data, userId },
    })

    return new NextResponse(JSON.stringify(store), { status: 201 })
  }),
)
