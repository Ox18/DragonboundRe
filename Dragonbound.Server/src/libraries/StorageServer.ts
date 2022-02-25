import Storage from "./Storage";
import Server from "./Server";

class StorageServer extends Storage<Server>{
    exists(id: number): boolean{
        return this.list.some(server => server.id === id);
    }

    find(id: number): Server{
        const server = this.list.find((server: Server) => server.id === id);
        if(server === undefined){
            throw new Error(`Server with id ${id} not found`);
        }
        return server;
    }
}

export default StorageServer;