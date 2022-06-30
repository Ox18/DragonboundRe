import WebSocket from "ws";

export default async (server) => {
    const ws = new WebSocket.Server({
        server
    });
    return ws;
}