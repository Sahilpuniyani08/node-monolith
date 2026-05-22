import fs from "fs-extra";

import { folders } from "../utils/constants";

export async function generateFolders(
  projectPath: string
) {
  for (const folder of folders) {
    await fs.ensureDir(
      `${projectPath}/${folder}`
    );
  }
}