"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePackageJson = generatePackageJson;
const versions_1 = require("../config/versions");
function generatePackageJson(config) {
    const dependencies = {
        express: versions_1.dependenciesVersion.express,
    };
    const devDependencies = {};
    // cors
    if (config.cors) {
        dependencies.cors =
            versions_1.dependenciesVersion.cors;
    }
    // morgan
    if (config.morgan) {
        dependencies.morgan =
            versions_1.dependenciesVersion.morgan;
    }
    // dotenv
    if (config.dotenv) {
        dependencies.dotenv =
            versions_1.dependenciesVersion.dotenv;
    }
    // typescript setup
    if (config.language === "TypeScript") {
        devDependencies.typescript =
            versions_1.devDependenciesVersion.typescript;
        devDependencies["ts-node"] =
            versions_1.devDependenciesVersion["ts-node"];
        devDependencies["@types/node"] =
            versions_1.devDependenciesVersion["@types/node"];
        devDependencies["@types/express"] =
            versions_1.devDependenciesVersion["@types/express"];
    }
    // nodemon
    devDependencies.nodemon =
        versions_1.devDependenciesVersion.nodemon;
    return {
        name: config.projectName,
        version: "1.0.0",
        scripts: {
            dev: config.language ===
                "TypeScript"
                ? "nodemon src/server.ts"
                : "nodemon src/server.js",
        },
        dependencies,
        devDependencies,
    };
}
