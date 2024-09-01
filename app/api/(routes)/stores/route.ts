import prismadb from "@/lib/prismadb"
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
    const { name } = await req.json()
    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const userId = auth().userId as string

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    })

    return new NextResponse(JSON.stringify(store), { status: 201 })
  }),
)
