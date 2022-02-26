import Client from "../Client";
import Subject from "../libraries/Subject";

class ClientListSubject extends Subject<ClientListSubject>{
    clients: Array<Client> = [];

    constructor(){
        super();
    }    

    add(client: Client): void {
        console.log("add");
        this.notify(this);
    }

    remove(client: Client): void {
        console.log("remove");
        
    }
}

export default ClientListSubject;