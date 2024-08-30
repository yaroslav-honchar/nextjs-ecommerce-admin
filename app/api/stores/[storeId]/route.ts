import { ObjectId } from "bson"

import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"

import prismadb from "@/lib/prismadb"

import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params: { storeId } }: IPropsWithStoreidParam,
): Promise<NextResponse> {
  if (!ObjectId.isValid(storeId)) {
    return new NextResponse("Invalid store id", { status: 400 })
  }

  try {
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

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
  } catch (error) {
    console.log("[STORE_PATCH]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) {
  if (!ObjectId.isValid(storeId)) {
    return new NextResponse("Invalid store id", { status: 400 })
  }

  try {
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    })

    return new NextResponse(JSON.stringify(store), { status: 200 })
  } catch (error) {
    console.log("[STORE_DELETE]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}
