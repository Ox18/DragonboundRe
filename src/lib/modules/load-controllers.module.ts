import * as path from "path";
import fs from "fs";
import { MainController } from "../controllers/main.controller";

export const loadControllers = async (dirRoot: string): Promise<MainController[]> => {

  const folderControllers = path.join(dirRoot, "./presentation/controllers");

  const controllers: MainController[] = [];

  const files = fs.readdirSync(folderControllers);

  for (const file of files) {
    const controller = await import(path.join(folderControllers, file));
    controllers.push(controller.default);
  }

  return controllers;
};
