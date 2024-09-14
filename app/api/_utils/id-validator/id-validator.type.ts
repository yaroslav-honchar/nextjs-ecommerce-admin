import type { NextRequest, NextResponse } from "next/server"

/**
 * Type definition for a handler function used in ID validation.
 *
 * @template T - The type of the parameters object.
 * @param {NextRequest} req - The incoming request object.
 * @param {T} params - The parameter object containing the request parameters.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 */
export type IDValidatorHandlerType<T> = (req: NextRequest, params: T) => Promise<NextResponse>
