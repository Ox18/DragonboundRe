import http from "http"
import { Logger } from "../../libraries/logger";

export default async ({ app, port }) => {
    const serverHTTP = http.createServer();
    serverHTTP.on("request", app);
    serverHTTP.listen(port, () => {
        Logger.INFO(`Server is running on port ${port}`);
    });
    return serverHTTP;
}