import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  console.log(req.body)

  return new NextResponse(JSON.stringify({ url: "/" }), { status: 200 })
}
