import type { NextRequest, NextResponse } from "next/server"

/**
 * Type definition for a handler function used in authentication guard.
 *
 * @template T - The type of the parameters object.
 * @param {NextRequest} req - The incoming request object.
 * @param {T} params - The parameter object containing the request parameters.
 * @param {string} userId - The ID of the authenticated user.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 */
export type AuthGuardHandlerType<T> = (req: NextRequest, params: T, userId: string) => Promise<NextResponse>
