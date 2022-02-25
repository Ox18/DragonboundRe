import Server from "./Server";
import Packet from "../util/Packet";
import CLIENT_OPCODE from "../consts/CLIENT_OPCODE";
import SERVER_OPCODE from "../consts/SERVER_OPCODE";

class Client{
    constructor(
        public connection: any,
        public contextServer: Server
    ){
        connection.on("message", this.onMessage.bind(this));
        connection.on("close", this.onClose.bind(this));
        connection.on("error", this.onError.bind(this));
        connection.on("open", this.onOpen.bind(this));
        this.init();
    }

    onMessage(message: any){
        const data: Array<any> = Packet.DecodeBuffer(message);
        const MESSAGE_ID = data[0];
        const MESSAGE_DATA = data.slice(1);
        this.processMessage(MESSAGE_ID, MESSAGE_DATA);
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

    init(){
        const { name, server_type, server_subtype  } = this.contextServer;
        const version = 133;
        const data = [version, name, server_type, server_subtype];
        this.sendMessage(SERVER_OPCODE.hi, data);
    }

    processMessage(MESSAGE_ID: Number, MESSAGE_DATA: Array<any>){
        switch(MESSAGE_ID){
            case CLIENT_OPCODE.login:
                console.log(MESSAGE_DATA);
                break;
            default:
                console.log(MESSAGE_ID, MESSAGE_DATA);
        }
    }

    sendMessage(MESSAGE_ID: Number, MESSAGE_DATA: Array<any>){
        const data = [MESSAGE_ID, ...MESSAGE_DATA];
        this.connection.send(Packet.ArrayToString(data));
    }
}

export default Client;