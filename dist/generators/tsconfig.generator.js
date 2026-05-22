"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTsConfig = generateTsConfig;
function generateTsConfig() {
    return {
        compilerOptions: {
            target: "ES2020",
            module: "CommonJS",
            rootDir: "./src",
            outDir: "./dist",
            esModuleInterop: true,
            strict: true,
        },
    };
}
