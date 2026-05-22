#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_app_1 = require("./create-app");
const program = new commander_1.Command();
program
    .name("sahil-cli")
    .description("Backend Boilerplate Generator");
program.command("create").action(async () => {
    await (0, create_app_1.createApp)();
});
program.parse();
