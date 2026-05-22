"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFolders = generateFolders;
const fs_extra_1 = __importDefault(require("fs-extra"));
const constants_1 = require("../utils/constants");
async function generateFolders(projectPath) {
    for (const folder of constants_1.folders) {
        await fs_extra_1.default.ensureDir(`${projectPath}/${folder}`);
    }
}
