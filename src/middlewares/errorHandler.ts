import { ErrorRequestHandler } from "express";
import { BaseApiError } from "../errors/BaseApiError";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof BaseApiError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  res.status(500).send({ message: "Something went wrong" });
};

export default errorHandler;
