import Client from "../Client";
import Subject from "../libraries/Subject";

class ClientListSubject extends Subject<ClientListSubject>{
    clients: Array<Client> = [];

    constructor(){
        super();
    }    

    add(client: Client): void {
        this.clients.push(client);
        this.notify(this);
    }

    remove(client: Client): void {
        this.clients = this.clients.filter(c => c !== client);
        this.notify(this);
    }
}

export default ClientListSubject;