import { ObjectId } from "bson"
import type { IPropsWithStoreidCategoryidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send a category of a store
export async function GET(_req: NextRequest, { params: { storeId, categoryId } }: IPropsWithStoreidCategoryidParam) {
  if (!ObjectId.isValid(storeId) || !ObjectId.isValid(categoryId)) {
    return new NextResponse("Invalid store or category id", { status: 400 })
  }

  try {
    const category = await prismadb.category.findUnique({
      where: { storeId, id: categoryId },
    })

    return new NextResponse(JSON.stringify(category), { status: 200 })
  } catch (error) {
    console.log("[CATEGORY_GET]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}

// Update a category of a store
export async function PATCH(req: NextRequest, { params: { storeId, categoryId } }: IPropsWithStoreidCategoryidParam) {
  if (!ObjectId.isValid(storeId) || !ObjectId.isValid(categoryId)) {
    return new NextResponse("Invalid store or category id", { status: 400 })
  }

  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const { name, billboardId } = await req.json()
    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 })
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

    const category = await prismadb.category.update({
      where: { id: categoryId, storeId },
      data: { name, billboardId },
    })

    return new NextResponse(JSON.stringify(category), { status: 200 })
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}

// Delete a category of a store
export async function DELETE(_req: NextRequest, { params: { storeId, categoryId } }: IPropsWithStoreidCategoryidParam) {
  if (!ObjectId.isValid(storeId) || !ObjectId.isValid(categoryId)) {
    return new NextResponse("Invalid store or category id", { status: 400 })
  }

  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const category = await prismadb.category.delete({
      where: { id: categoryId, storeId },
    })

    return new NextResponse(JSON.stringify(category), { status: 200 })
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}
