import { ObjectId } from "bson"

import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"

import prismadb from "@/lib/prismadb"

import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Send all categories of a store
export async function GET(_req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) {
  if (!ObjectId.isValid(storeId)) {
    return new NextResponse("Invalid store id", { status: 400 })
  }

  try {
    const categories = await prismadb.category.findMany({
      where: { storeId },
    })

    return new NextResponse(JSON.stringify(categories), { status: 200 })
  } catch (error) {
    console.log("[CATEGORIES_GET]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}

// Create a new category for a store
export async function POST(req: NextRequest, { params: { storeId } }: IPropsWithStoreidParam) {
  if (!ObjectId.isValid(storeId)) {
    return new NextResponse("Invalid store id", { status: 400 })
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
      where: { id: storeId, userId },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    })

    return new NextResponse(JSON.stringify(category), { status: 201 })
  } catch (error) {
    console.log("[CATEGORIES_POST]", error)
    return new NextResponse("Internal Server ErrorDisplay", { status: 500 })
  }
}
