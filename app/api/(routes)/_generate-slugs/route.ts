import slug from "slug"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    console.log("Getting categories")
    const categories = await prismadb.category.findMany()
    console.log(categories)

    for (const category of categories) {
      console.log(`Updating category [${category.name}] with slug: ${slug(category.name)}-${category.id}`)
      await prismadb.category.update({
        where: { id: category.id },
        data: { slug: `${slug(category.name)}-${category.id}` },
      })
    }

    console.log("Getting products")
    const products = await prismadb.product.findMany()
    for (const product of products) {
      console.log(`Updating product [${product.name}] with slug: ${slug(product.name)}-${product.id}`)
      await prismadb.product.update({
        where: { id: product.id },
        data: { slug: `${slug(product.name)}-${product.id}` },
      })
    }

    return new NextResponse("Slugs generated successfully", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Slugs generating failed", { status: 500 })
  }
}
