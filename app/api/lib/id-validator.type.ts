import type { NextRequest, NextResponse } from "next/server"

export type IDValidatorHandlerType<T> = (req: NextRequest, params: T) => Promise<NextResponse>
