import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { name } = await req.json()
    if (!name) {
      return new Response("Name is required", { status: 400 })
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    })

    return new Response(JSON.stringify(store), { status: 201 })
  } catch (error) {
    console.log("[STORES_POST]", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
