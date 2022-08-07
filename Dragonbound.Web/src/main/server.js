import ENV from "./config/env";
import { setupApp } from "./config/app";
import { connection } from "../infraestructure/db/config/connection";
import { Logger } from "../libraries/logger";

(async () => {
    // auth coonnection
    await connection.authenticate();
    Logger.INFO("Connection to database successful");
    await connection.sync();
    Logger.INFO("Database synced");
    const app = await setupApp();
    app.listen(ENV.port, () => {
        Logger.INFO(`Server running on port ${ENV.port}`);
        Logger.INFO("Development with <3 by lnferno");
    })
})()