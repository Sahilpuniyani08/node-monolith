export function generateAuthController() {
  return `
import { Request, Response } from "express";

export const login = async (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: "Login Route",
  });
};
`;
}

export function generateAuthRoute() {
  return `
import { Router } from "express";

import { login } from "./auth.controller";

const router = Router();

router.post("/login", login);

export default router;
`;
}

export function generateAuthService() {
  return `
export const authService = {};
`;
}