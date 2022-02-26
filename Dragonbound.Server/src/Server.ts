import StorageClient from "./libraries/StorageClient";
import StorageRoom from "./libraries/StorageRoom";

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