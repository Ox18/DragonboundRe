import ServerSocket from "./libraries/ServerSocket";
import ServerA from "./ServerA";

const SOCKET_PORT = 9001;
const CLIENT_VERSION = 133;

const serverBeginner = new ServerA();

const serverSocket = new ServerSocket(SOCKET_PORT, CLIENT_VERSION);
serverSocket.servers.add(serverBeginner);