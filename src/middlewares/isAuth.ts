import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors";

const isAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError();
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "string") {
      req.user = JSON.parse(decoded);
    } else {
      req.user = { ...decoded } as any;
    }
    next();
  } catch (err) {
    throw new UnauthorizedError();
  }
};

export default isAuth;
