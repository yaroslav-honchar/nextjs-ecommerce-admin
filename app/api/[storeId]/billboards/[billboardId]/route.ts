import { ObjectId } from "bson"
import type { IPropsWithStoreidBillboardidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a billboard of a store
export async function GET(_req: NextRequest, { params: { storeId, billboardId } }: IPropsWithStoreidBillboardidParam) {
  if (!ObjectId.isValid(storeId) || !ObjectId.isValid(billboardId)) {
    return new NextResponse("Invalid store or billboard id", { status: 400 })
  }

  try {
    const billboard = await prismadb.billboard.findUnique({
      where: { storeId, id: billboardId },
    })

    return new NextResponse(JSON.stringify(billboard), { status: 200 })
  } catch (error) {
    console.log("[BILLBOARD_GET]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}

// Update a billboard of a store
export async function PATCH(req: NextRequest, { params: { storeId, billboardId } }: IPropsWithStoreidBillboardidParam) {
  if (!ObjectId.isValid(storeId) || !ObjectId.isValid(billboardId)) {
    return new NextResponse("Invalid store or billboard id", { status: 400 })
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
      where: {
        id: storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const billboard = await prismadb.billboard.update({
      where: { id: billboardId, storeId },
      data: { label, imageUrl },
    })

    return new NextResponse(JSON.stringify(billboard), { status: 200 })
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}

// Delete a billboard of a store
export async function DELETE(
  _req: NextRequest,
  { params: { storeId, billboardId } }: IPropsWithStoreidBillboardidParam,
) {
  if (!ObjectId.isValid(storeId) || !ObjectId.isValid(billboardId)) {
    return new NextResponse("Invalid store or billboard id", { status: 400 })
  }

  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const billboard = await prismadb.billboard.delete({
      where: {
        id: billboardId,
        storeId,
      },
    })

    return new NextResponse(JSON.stringify(billboard), { status: 200 })
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}
