import { ProjectConfig } from "../types/config.types";

import {
  dependenciesVersion,
  devDependenciesVersion,
} from "../config/versions";

export function generatePackageJson(
  config: ProjectConfig
) {
  const dependencies: Record<
    string,
    string
  > = {
    express:
      dependenciesVersion.express,
  };

  const devDependencies: Record<
    string,
    string
  > = {};

  // cors
  if (config.cors) {
    dependencies.cors =
      dependenciesVersion.cors;
  }

  // morgan
  if (config.morgan) {
    dependencies.morgan =
      dependenciesVersion.morgan;
  }

  // dotenv
  if (config.dotenv) {
    dependencies.dotenv =
      dependenciesVersion.dotenv;
  }

  // typescript setup
  if (config.typescript) {
    devDependencies.typescript =
      devDependenciesVersion.typescript;

    devDependencies["ts-node"] =
      devDependenciesVersion["ts-node"];

    devDependencies["@types/node"] =
      devDependenciesVersion["@types/node"];

    devDependencies["@types/express"] =
      devDependenciesVersion["@types/express"];
  }

  // nodemon
  devDependencies.nodemon =
    devDependenciesVersion.nodemon;

  return {
    name: config.projectName,
    version: "1.0.0",
    scripts: {
      dev:
          config.typescript
          ? "nodemon src/server.ts"
          : "nodemon src/server.js",
    },
    dependencies,
    devDependencies,
  };
}