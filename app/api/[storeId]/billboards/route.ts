import { ObjectId } from "bson"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all billboards of a store
export async function GET(_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) {
  if (!ObjectId.isValid(storeId)) {
    return new NextResponse("Invalid store id", { status: 400 })
  }

  try {
    const billboards = await prismadb.billboard.findMany({
      where: { storeId },
    })

    return new NextResponse(JSON.stringify(billboards), { status: 200 })
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}

// Create a new billboard for a store
export async function POST(req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) {
  if (!ObjectId.isValid(storeId)) {
    return new NextResponse("Invalid store id", { status: 400 })
  }

  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const { label, imageUrl } = await req.json()
    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: storeId, userId },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    })

    return new NextResponse(JSON.stringify(billboard), { status: 201 })
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}
