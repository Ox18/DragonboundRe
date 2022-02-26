import AddClientListObserver from "./Observers/ClientList/AddClientListObserver";
import StorageRoom from "./storages/StorageRoom";
import ClientListSubject from "./Subjects/ClientListSubject";

class Server{
    constructor(
        public id: number = 0,
        public name: string = "",
        public server_type: number = 0,
        public server_subtype: number = 0,
        public clientList: ClientListSubject = new ClientListSubject(),
        public roomList: StorageRoom = new StorageRoom(),
    ){

        this.clientList.subscribe(new AddClientListObserver());
    }
}

export default Server;