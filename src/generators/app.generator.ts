// src/generators/app.generator.ts

import { ProjectConfig } from "../types/config.types";

export function generateAppFile(config: ProjectConfig) {
  const ext = config.typescript ? "" : ".js";

  let imports = `
import express from "express";
`;

  if (config.cors) {
    imports += `
import cors from "cors";
`;
  }

  if (config.morgan) {
    imports += `
import morgan from "morgan";
`;
  }

  if (config.dotenv) {
    imports += `
import dotenv from "dotenv";
`;
  }

  imports += `
import routes from "./routes/index${ext}";
import { errorMiddleware } from "./middlewares/error.middleware${ext}";
`;

  let setup = `
const app = express();
`;

  if (config.dotenv) {
    setup += `
dotenv.config();
`;
  }

  setup += `
app.use(express.json());
`;

  if (config.cors) {
    setup += `
app.use(
  cors({
    origin: "*",
  }),
);
`;
  }

  if (config.morgan) {
    setup += `
app.use(morgan("dev"));
`;
  }

  return `
${imports}

${setup}

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

app.use(errorMiddleware);

export default app;
`;
}
