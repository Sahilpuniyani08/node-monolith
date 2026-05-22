"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestions = askQuestions;
const inquirer_1 = __importDefault(require("inquirer"));
async function askQuestions() {
    return inquirer_1.default.prompt([
        {
            type: "input",
            name: "projectName",
            message: "Project name:",
        },
        {
            type: "list",
            name: "language",
            message: "Select language:",
            choices: ["TypeScript", "JavaScript"],
        },
        {
            type: "confirm",
            name: "cors",
            message: "Enable CORS?",
        },
        {
            type: "confirm",
            name: "morgan",
            message: "Enable Morgan?",
        },
        {
            type: "confirm",
            name: "dotenv",
            message: "Enable dotenv?",
        },
    ]);
}
