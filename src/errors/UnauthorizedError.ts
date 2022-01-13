import { BaseApiError } from "./BaseApiError";
import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends BaseApiError {
  constructor(message: string = "Not authorized") {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
