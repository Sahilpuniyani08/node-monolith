#!/usr/bin/env node

import { Command } from "commander";
import { createApp } from "./create-app";

const program = new Command();

program
  .name("sahil-cli")
  .description("Backend Boilerplate Generator");

program.command("create").action(async () => {
  await createApp();
});

program.parse();