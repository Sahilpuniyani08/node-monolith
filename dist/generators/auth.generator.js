"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthController = generateAuthController;
exports.generateAuthRoute = generateAuthRoute;
exports.generateAuthService = generateAuthService;
function generateAuthController() {
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
function generateAuthRoute() {
    return `
import { Router } from "express";

import { login } from "./auth.controller";

const router = Router();

router.post("/login", login);

export default router;
`;
}
function generateAuthService() {
    return `
export const authService = {};
`;
}
