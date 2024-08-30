import prismadb from "@/lib/prismadb"

import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { name } = await req.json()
    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    })

    return new NextResponse(JSON.stringify(store), { status: 201 })
  } catch (error) {
    console.log("[STORES_POST]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}
