import type { NextRequest, NextResponse } from "next/server"

/**
 * Type definition for a handler function used in exception filtering.
 *
 * @template T - The type of the parameters object.
 * @param {NextRequest} req - The incoming request object.
 * @param {T} params - The parameter object containing the request parameters.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 */
export type ExceptionFilterHandlerType<T> = (req: NextRequest, params: T) => Promise<NextResponse>

/**
 * Type definition for HTTP methods used in exception filtering.
 *
 * @typedef {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} ExceptionFilterMethodType
 */
export type ExceptionFilterModuleType =
  | "STORE"
  | "STORES"
  | "BILLBOARD"
  | "BILLBOARDS"
  | "CATEGORY"
  | "CATEGORIES"
  | "SIZE"
  | "SIZES"
  | "COLOR"
  | "COLORS"
export type ExceptionFilterMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
