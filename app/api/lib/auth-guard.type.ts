import type { NextRequest, NextResponse } from "next/server"

export type AuthGuardHandlerType<T> = (req: NextRequest, params: T, userId: string) => Promise<NextResponse>
