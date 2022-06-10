import AddClientListObserver from "./Observers/ClientList/AddClientListObserver";
import ClientListSubject from "./Subjects/ClientListSubject";
import RoomListSubject from "./Subjects/RoomList.subject";

class Server{
    constructor(
        public id: number = 0,
        public name: string = "",
        public server_type: number = 0,
        public server_subtype: number = 0,
        public clientList: ClientListSubject = new ClientListSubject(),
        public roomList: RoomListSubject = new RoomListSubject()
    ){

        this.clientList.subscribe(new AddClientListObserver());
    }
}

export default Server;