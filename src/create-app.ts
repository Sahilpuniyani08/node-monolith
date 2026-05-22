import path from "path";
import fs from "fs-extra";

import {askQuestions} from "./prompt/questions";

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

export async function createApp() {
  // ask questions
  const answers = await askQuestions();

  // project path
  const projectPath = path.join(
    process.cwd(),
    answers.projectName
  );

  // check if folder already exists
  if (await fs.pathExists(projectPath)) {
    spinner.fail("Folder already exists");
    process.exit(1);
  }

  // loading start
  spinner.start("Creating project...");

  // create folders
  await generateFolders(projectPath);

  // package.json
  await fs.writeJson(
    `${projectPath}/package.json`,
    generatePackageJson(answers),
    {
      spaces: 2,
    }
  );

  // app.ts
  await fs.writeFile(
    `${projectPath}/src/app.ts`,
    generateAppFile(answers)
  );

  // server.ts
  await fs.writeFile(
    `${projectPath}/src/server.ts`,
    generateServerFile()
  );

  // .env
  await fs.writeFile(
    `${projectPath}/.env`,
    generateEnvFile()
  );

  // error middleware
  await fs.writeFile(
    `${projectPath}/src/middlewares/error.middleware.ts`,
    generateErrorMiddleware()
  );

  // async handler
  await fs.writeFile(
    `${projectPath}/src/middlewares/asyncHandler.ts`,
    generateAsyncHandler()
  );

  // auth controller
  await fs.writeFile(
    `${projectPath}/src/modules/auth/auth.controller.ts`,
    generateAuthController()
  );

  // auth route
  await fs.writeFile(
    `${projectPath}/src/modules/auth/auth.route.ts`,
    generateAuthRoute()
  );

  // auth service
  await fs.writeFile(
    `${projectPath}/src/modules/auth/auth.service.ts`,
    generateAuthService()
  );

  await fs.writeFile(
  `${projectPath}/.gitignore`,
  generateGitignore()
);

await fs.writeJson(
  `${projectPath}/tsconfig.json`,
  generateTsConfig(),
  {
    spaces: 2,
  }
);

  // success
  spinner.succeed(
    "Project created successfully"
  );

  console.log(`
Next steps:

cd ${answers.projectName}
npm install
npm run dev
`);
}