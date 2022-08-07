import WebSocket from "ws";

export default async (server) => {
    return new WebSocket.Server({ server });
}