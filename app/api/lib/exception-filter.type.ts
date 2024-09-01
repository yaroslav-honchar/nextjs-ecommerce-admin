import type { NextRequest, NextResponse } from "next/server"

export type ExceptionFilterHandlerType<T> = (req: NextRequest, params: T) => Promise<NextResponse>
export type ExceptionFilterMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
