import StorageClient from "./StorageClient";

class Server{
    constructor(
        public id: number = 0,
        public name: string = "",
        public server_type: number = 0,
        public server_subtype: number = 0,
        public clientList: StorageClient = new StorageClient()
    ){}
}

export default Server;