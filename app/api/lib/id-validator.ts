import { ObjectId } from "bson"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { IDValidatorHandlerType } from "./id-validator.type"

export function IDValidator<ParamsType extends Record<string, any>>(handler: IDValidatorHandlerType<ParamsType>) {
  return async (req: NextRequest, params: ParamsType): Promise<NextResponse> => {
    const invalidIds = Object.keys(params!).filter((key) => key.endsWith("Id") && !ObjectId.isValid(params[key]))

    if (invalidIds.length > 0) {
      return new NextResponse(`Invalid IDs: ${invalidIds.join(", ")}`, { status: 400 })
    }

    return handler(req, params)
  }
}
