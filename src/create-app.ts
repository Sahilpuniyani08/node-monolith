// src/create-app.ts

import path from "path";
import fs from "fs-extra";

import { askQuestions } from "./prompt/questions";

import { spinner } from "./utils/logger";

import { generateFolders } from "./generators/folders.generator";

import { generatePackageJson } from "./generators/package.generator";

import { generateServerFile } from "./generators/server.generator";

import { generateAppFile } from "./generators/app.generator";

import { generateEnvFile } from "./generators/env.generator";

import {
  generateErrorMiddleware,
  generateAsyncHandler,
} from "./generators/middleware.generator";

import {
  generateAuthController,
  generateAuthRoute,
  generateAuthService,
} from "./generators/auth.generator";

import { generateGitignore } from "./generators/gitignore.generator";

import { generateTsConfig } from "./generators/tsconfig.generator";

import { generateRoutesIndex } from "./generators/routes.generator";

import { generateApiErrorFile } from "./generators/apiError.generator";

export async function createApp() {
  const answers = await askQuestions();

  const ext = answers.typescript ? "ts" : "js";

  const projectPath =
    answers.projectName === "."
      ? process.cwd()
      : path.join(process.cwd(), answers.projectName);

  if (answers.projectName !== "." && (await fs.pathExists(projectPath))) {
    spinner.fail("Folder already exists");

    process.exit(1);
  }

  spinner.start("Creating project...");

  await generateFolders(projectPath);

  await fs.writeJson(
    `${projectPath}/package.json`,
    generatePackageJson(answers),
    {
      spaces: 2,
    },
  );

  await fs.writeFile(`${projectPath}/src/app.${ext}`, generateAppFile(answers));

  await fs.writeFile(
    `${projectPath}/src/server.${ext}`,
    generateServerFile(answers.typescript),
  );

  await fs.writeFile(`${projectPath}/.env`, generateEnvFile());

  await fs.writeFile(
    `${projectPath}/src/middlewares/error.middleware.${ext}`,
    generateErrorMiddleware(answers.typescript),
  );

  await fs.writeFile(
    `${projectPath}/src/middlewares/asyncHandler.${ext}`,
    generateAsyncHandler(answers.typescript),
  );

  await fs.writeFile(
    `${projectPath}/src/modules/auth/auth.controller.${ext}`,
    generateAuthController(answers),
  );

  await fs.writeFile(
    `${projectPath}/src/modules/auth/auth.route.${ext}`,
    generateAuthRoute(answers),
  );

  await fs.writeFile(
    `${projectPath}/src/modules/auth/auth.service.${ext}`,
    generateAuthService(),
  );

  await fs.writeFile(
    `${projectPath}/src/routes/index.${ext}`,
    generateRoutesIndex(answers),
  );

  await fs.writeFile(
    `${projectPath}/src/utils/apiError.${ext}`,
    generateApiErrorFile(answers.typescript),
  );

  await fs.writeFile(`${projectPath}/.gitignore`, generateGitignore());

  if (answers.typescript) {
    await fs.writeJson(`${projectPath}/tsconfig.json`, generateTsConfig(), {
      spaces: 2,
    });
  }

  spinner.succeed("Project created successfully");

  console.log(`
Next steps:

cd ${answers.projectName}
npm install
npm run dev
`);
}
