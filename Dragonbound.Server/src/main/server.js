import setupApp from "./config/app";
import ENV from "./config/env"

(async () => {
    await setupApp(ENV.port, () => {
        console.log(`Server is running on port ${ENV.port}`);
    });
})()