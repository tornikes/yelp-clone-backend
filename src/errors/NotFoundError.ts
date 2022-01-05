import { BaseApiError } from "./BaseApiError";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends BaseApiError {
  constructor(message: string = "Requested resource was not found") {
    super(message, StatusCodes.NOT_FOUND);
  }
}
