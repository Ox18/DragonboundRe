import StorageClient from "./StorageClient";
import StorageRoom from "./StorageRoom";

class Server{
    constructor(
        public id: number = 0,
        public name: string = "",
        public server_type: number = 0,
        public server_subtype: number = 0,
        public clientList: StorageClient = new StorageClient(),
        public roomList: StorageRoom = new StorageRoom(),
    ){}
}

export default Server;