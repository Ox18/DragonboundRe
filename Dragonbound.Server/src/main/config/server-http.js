import http from "http";

export default async (app, port, callbackSuccess) => {
    const serverHTTP = http.createServer();
    serverHTTP.on("request", app);
    serverHTTP.listen(port, callbackSuccess);
    return serverHTTP
}