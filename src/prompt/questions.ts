import inquirer from "inquirer";
import { ProjectConfig } from "../types/config.types";

export async function askQuestions(): Promise<ProjectConfig> {
  return inquirer.prompt([
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
