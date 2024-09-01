import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { ExceptionFilterHandlerType, ExceptionFilterMethodType } from "./exception-filter.type"

export function exceptionFilter<ParamsType = undefined>(
  module: string,
  method: ExceptionFilterMethodType,
  handler: ExceptionFilterHandlerType<ParamsType>,
) {
  return async function (req: NextRequest, params: ParamsType): Promise<NextResponse> {
    try {
      return await handler(req, params)
    } catch (error: unknown) {
      console.error(`[${module}_${method}]`, error)
      return new NextResponse("Internal Server Error", { status: 500 })
    }
  }
}
