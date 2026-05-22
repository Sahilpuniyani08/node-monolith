export function generateErrorMiddleware() {
  return `
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
`;
}

export function generateAsyncHandler() {
  return `
import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fn: Function) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
`;
}