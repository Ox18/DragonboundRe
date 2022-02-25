import Storage from "./Storage";
import Server from "./Server";

class StorageServer extends Storage<Server>{
    constructor(){
        super();
    }

    exists(id: number): boolean{
        return this.list.some(server => server.id === id);
    }
}

export default StorageServer;