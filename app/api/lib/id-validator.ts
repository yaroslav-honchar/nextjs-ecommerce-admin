import { ObjectId } from "bson"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { IDValidatorHandlerType } from "./id-validator.type"

/**
 * A higher-order function that validates ObjectId parameters in the request.
 *
 * @template ParamsType - The type of the parameters object.
 * @param {IDValidatorHandlerType<ParamsType>} handler - The handler functions to be executed if validation passes.
 * @returns {Function} - A function that takes a NextRequest and parameters, validates the IDs,
 * and either returns a 400 response or calls the handler.
 */
export function IDValidator<ParamsType extends Record<string, any>>(
  handler: IDValidatorHandlerType<ParamsType>,
): NextResponse | IDValidatorHandlerType<ParamsType> {
  return async (req: NextRequest, params: ParamsType): Promise<NextResponse> => {
    // Filter out invalid ObjectId parameters
    const invalidIds = Object.keys(params!).filter((key) => key.endsWith("Id") && !ObjectId.isValid(params[key]))

    // If there are invalid IDs, return a 400 response with the list of invalid IDs
    if (invalidIds.length > 0) {
      return new NextResponse(`Invalid IDs: ${invalidIds.join(", ")}`, { status: 400 })
    }

    // If all IDs are valid, call the handler function
    return handler(req, params)
  }
}
