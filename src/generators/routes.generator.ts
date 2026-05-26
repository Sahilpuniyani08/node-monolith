import { ProjectConfig } from "../types/config.types";

export function generateRoutesIndex( config: ProjectConfig) {
  const ext = config.typescript ? "" : ".js";

  return `
import { Router } from "express";
import authRoutes from "../modules/auth/auth.route${ext}";

${
  config.typescript
    ? "const router: Router = Router();"
    : "const router = Router();"
}

router.use("/auth", authRoutes);

export default router;
`;
}