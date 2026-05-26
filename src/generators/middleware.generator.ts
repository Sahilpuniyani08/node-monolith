// src/generators/middleware.generator.ts

export function generateErrorMiddleware(typescript: boolean) {
  if (typescript) {
    return `
import {
  Request,
  Response,
  NextFunction,
} from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};
`;
  }

  return `
export const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};
`;
}

export function generateAsyncHandler(typescript: boolean) {
  if (typescript) {
    return `
import {
  Request,
  Response,
  NextFunction,
} from "express";

export const asyncHandler =
  (fn: Function) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(
      fn(req, res, next)
    ).catch(next);
  };
`;
  }

  return `
export const asyncHandler =
  (fn) =>
  (req, res, next) => {
    Promise.resolve(
      fn(req, res, next)
    ).catch(next);
  };
`;
}
