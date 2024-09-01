import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { ExceptionFilterHandlerType, ExceptionFilterMethodType } from "./exception-filter.type"

/**
 * A higher-order function that wraps a handler function with exception filtering.
 *
 * @template ParamsType - The type of the parameters object.
 * @param {string} module - The name of the module where the handler is located.
 * @param {ExceptionFilterMethodType} method - The HTTP method used in the request.
 * @param {ExceptionFilterHandlerType<ParamsType>} handler - The handler function to be executed.
 * @returns {Function} - A function that takes a NextRequest and parameters, executes the handler, and catches any exceptions, returning a 500 response if an error occurs.
 */
export function exceptionFilter<ParamsType = undefined>(
  module: string,
  method: ExceptionFilterMethodType,
  handler: ExceptionFilterHandlerType<ParamsType>,
): NextResponse | ExceptionFilterHandlerType<ParamsType> {
  return async function (req: NextRequest, params: ParamsType): Promise<NextResponse> {
    try {
      // Attempt to execute the handler function
      return await handler(req, params)
    } catch (error: unknown) {
      // Log the error and return a 500 response if an exception occurs
      console.error(`[${module}_${method}]`, error)
      return new NextResponse("Internal Server Error", { status: 500 })
    }
  }
}
