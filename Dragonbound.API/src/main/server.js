import ENV from "./config/env";
import { db } from "@infra/db/sequelize/lib/connection";


(async () => {
    await db.connection.authenticate();
    console.log("Connection has been established successfully.");
    await db.connection.sync();
    console.log("Tables has been synced successfully.");
    const { setupApp } = await require("./config/app");
    const app = await setupApp();
    app.listen(ENV.port, () => {
        console.log(`Server is running on port ${ENV.port}`);
    })
})()    