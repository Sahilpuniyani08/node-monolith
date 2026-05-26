// src/generators/auth.generator.ts

import { ProjectConfig } from "../types/config.types";

export function generateAuthController(config: ProjectConfig) {
  if (config.typescript) {
    return `
import {
  Request,
  Response,
} from "express";

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

  return `
export const login = async (
  req,
  res
) => {
  res.json({
    success: true,
    message: "Login Route",
  });
};
`;
}

export function generateAuthRoute(config: ProjectConfig) {
  const ext = config.typescript ? "" : ".js";

  if (config.typescript) {
    return `
import { Router } from "express";
import { login } from "./auth.controller${ext}";

const router: Router = Router();

router.post("/login", login);

export default router;
`;
  }

  return `
import { Router } from "express";
import { login } from "./auth.controller${ext}";

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
