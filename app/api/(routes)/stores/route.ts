import prismadb from "@/lib/prismadb"
import { storeDataSchema } from "@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form.schema"
import { authGuard } from "@/app/api/lib/auth-guard"
import { exceptionFilter } from "@/app/api/lib/exception-filter"
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
