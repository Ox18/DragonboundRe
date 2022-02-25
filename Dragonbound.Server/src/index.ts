import ServerSocket from "./libraries/ServerSocket";
import Server from "./Server";

const server_1 = new Server(1);

const serverSocket = new ServerSocket(9001);
serverSocket.servers.add(server_1);
