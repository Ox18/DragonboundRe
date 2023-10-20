
require('module-alias/register')
import path from "path";
import { application } from "./lib/application";
import { initialize } from "./mock/services/initalize.service";

application(path.join(__dirname)).then(async () => {
  await initialize();
});
