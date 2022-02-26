import ClientListSubject from "../../Subjects/ClientListSubject";

class AddClientListObserver{
    notify(model: ClientListSubject){
        console.log("Ha surgido un cambio y me han llamado soy: " + this.constructor.name);
        console.log(model.clients.length);
    }
}

export default AddClientListObserver;