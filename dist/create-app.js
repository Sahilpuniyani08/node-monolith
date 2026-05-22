"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const questions_1 = require("./prompt/questions");
const logger_1 = require("./utils/logger");
const folders_generator_1 = require("./generators/folders.generator");
const package_generator_1 = require("./generators/package.generator");
const server_generator_1 = require("./generators/server.generator");
const app_generator_1 = require("./generators/app.generator");
const env_generator_1 = require("./generators/env.generator");
const middleware_generator_1 = require("./generators/middleware.generator");
const auth_generator_1 = require("./generators/auth.generator");
const gitignore_generator_1 = require("./generators/gitignore.generator");
const tsconfig_generator_1 = require("./generators/tsconfig.generator");
async function createApp() {
    // ask questions
    const answers = await (0, questions_1.askQuestions)();
    // project path
    const projectPath = path_1.default.join(process.cwd(), answers.projectName);
    // check if folder already exists
    if (await fs_extra_1.default.pathExists(projectPath)) {
        logger_1.spinner.fail("Folder already exists");
        process.exit(1);
    }
    // loading start
    logger_1.spinner.start("Creating project...");
    // create folders
    await (0, folders_generator_1.generateFolders)(projectPath);
    // package.json
    await fs_extra_1.default.writeJson(`${projectPath}/package.json`, (0, package_generator_1.generatePackageJson)(answers), {
        spaces: 2,
    });
    // app.ts
    await fs_extra_1.default.writeFile(`${projectPath}/src/app.ts`, (0, app_generator_1.generateAppFile)(answers));
    // server.ts
    await fs_extra_1.default.writeFile(`${projectPath}/src/server.ts`, (0, server_generator_1.generateServerFile)());
    // .env
    await fs_extra_1.default.writeFile(`${projectPath}/.env`, (0, env_generator_1.generateEnvFile)());
    // error middleware
    await fs_extra_1.default.writeFile(`${projectPath}/src/middlewares/error.middleware.ts`, (0, middleware_generator_1.generateErrorMiddleware)());
    // async handler
    await fs_extra_1.default.writeFile(`${projectPath}/src/middlewares/asyncHandler.ts`, (0, middleware_generator_1.generateAsyncHandler)());
    // auth controller
    await fs_extra_1.default.writeFile(`${projectPath}/src/modules/auth/auth.controller.ts`, (0, auth_generator_1.generateAuthController)());
    // auth route
    await fs_extra_1.default.writeFile(`${projectPath}/src/modules/auth/auth.route.ts`, (0, auth_generator_1.generateAuthRoute)());
    // auth service
    await fs_extra_1.default.writeFile(`${projectPath}/src/modules/auth/auth.service.ts`, (0, auth_generator_1.generateAuthService)());
    await fs_extra_1.default.writeFile(`${projectPath}/.gitignore`, (0, gitignore_generator_1.generateGitignore)());
    await fs_extra_1.default.writeJson(`${projectPath}/tsconfig.json`, (0, tsconfig_generator_1.generateTsConfig)(), {
        spaces: 2,
    });
    // success
    logger_1.spinner.succeed("Project created successfully");
    console.log(`
Next steps:

cd ${answers.projectName}
npm install
npm run dev
`);
}
