import ENV from "./config/env";
import { setupApp } from "./config/app";

(async () => {
    const app = await setupApp();
    app.listen(ENV.port, () => {
        console.log(`Server is running on port ${ENV.port}`);
    })
})()