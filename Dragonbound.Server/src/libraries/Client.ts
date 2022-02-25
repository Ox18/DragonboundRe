import Server from "./Server";
import Packet from "../util/Packet";

class Client{
    constructor(
        public connection: any,
        public contextServer: Server
    ){
        connection.on("message", this.onMessage.bind(this));
        connection.on("close", this.onClose.bind(this));
        connection.on("error", this.onError.bind(this));
        connection.on("open", this.onOpen.bind(this));

    }

    onMessage(message: any){
        const data: Array<String | Number> = Packet.DecodeBuffer(message);
    }

    onClose(...args: any){
        console.log(args);
    }

    onError(){
        throw new Error("OnError is not implemented");
    }

    onOpen(){
        throw new Error("OnOpen is not implemented");
    }
}

export default Client;