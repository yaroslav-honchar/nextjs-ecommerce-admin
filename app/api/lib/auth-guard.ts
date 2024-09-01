import { auth } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { AuthGuardHandlerType } from "./auth-guard.type"

export function authGuard<ParamsType = undefined>(handler: AuthGuardHandlerType<ParamsType>) {
  return async (req: NextRequest, params: ParamsType): Promise<NextResponse> => {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    return handler(req, params, userId)
  }
}
