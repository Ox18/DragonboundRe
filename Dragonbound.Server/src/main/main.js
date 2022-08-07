import setupApp from "./config/app";
import ENV from "./config/env";
import { Logger } from "../libraries/logger";
import { connection  } from "../infraestructure/db/config/connection";

import { ServerRepository } from "../infraestructure/db/repositories/server-repository";

const serverRepository = ServerRepository.create();

(async () => {
    await connection.authenticate();
    Logger.INFO("Connection to database successful");
    await connection.sync();
    Logger.INFO("Database synced");
    await serverRepository.deleteAll();
    Logger.INFO("Servers deleted");
    await setupApp(ENV.port)
})()