import ModelLib from "../Libraries/ModelLib";

var schema = {
    id: undefined,
    server: undefined,
    app: undefined,
    connection: undefined
}

class Account extends ModelLib{
    constructor(){
        super(schema);
    }

    init(){
        this.connection.on("message", (message) => {
            console.log(JSON.parse(message)); // receive message
        });
    }

    send(data){
        try{
            const message = JSON.stringify(data);
            this.sendUTF8(message);
        }catch(ex){
            console.log(ex);
        }
    }

    sendUTF8(message){
        this.connection.send(message);
    }
}

export default Account;