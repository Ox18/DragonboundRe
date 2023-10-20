import path from "path";
import { application } from "./lib/application";
import { initializeServers } from "./mock/services/initialize-servers.service";

application(path.join(__dirname)).then(async () => {
  await initializeServers();
});
