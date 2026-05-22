"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAppFile = generateAppFile;
function generateAppFile(config) {
    let imports = `
import express from "express";
`;
    let middlewares = `
app.use(express.json());
`;
    // dotenv
    if (config.dotenv) {
        imports += `
import dotenv from "dotenv";
`;
        middlewares += `
dotenv.config();
`;
    }
    // cors
    if (config.cors) {
        imports += `
import cors from "cors";
`;
        middlewares += `
app.use(cors());
`;
    }
    // morgan
    if (config.morgan) {
        imports += `
import morgan from "morgan";
`;
        middlewares += `
app.use(morgan("dev"));
`;
    }
    // error middleware import
    imports += `
import { errorMiddleware } from "./middlewares/error.middleware";
`;
    // auth route import
    imports += `
import authRoutes from "./modules/auth/auth.route";
`;
    return `
${imports}

const app = express();

${middlewares}

// routes
app.use("/api/v1/auth", authRoutes);

// health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

// global error middleware
app.use(errorMiddleware);

export default app;
`;
}
