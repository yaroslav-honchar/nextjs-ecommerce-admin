import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { AuthGuardHandlerType } from "./auth-guard.type"

/**
 * A higher-order function that provides authentication guard for the handler.
 *
 * @template ParamsType - The type of the parameters object.
 * @param {AuthGuardHandlerType<ParamsType>} handler - The handler functions to be executed if authentication passes.
 */
export function authGuard<ParamsType = undefined>(handler: AuthGuardHandlerType<ParamsType>) {
  return async (req: NextRequest, params: ParamsType): Promise<NextResponse> => {
    // Retrieve the userId from the authentication context
    const { userId } = auth()

    // If there is no userId, return a 401 response indicating unauthenticated access
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    // If authenticated, call the handler function with the userId
    return await handler(req, params, userId)
  }
}
