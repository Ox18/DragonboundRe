import Server from "./Server";
import Packet from "../util/Packet";

class Client{
    constructor(
        public connection: any,
        public contextServer: Server
    ){
        connection.on("message", this.onMessage.bind(this));
    }

    onMessage(message: any){
        const data: Array<String | Number> = Packet.DecodeBuffer(message);
        console.log(data);
        // const buffer = message.toJSON();
        // const data = Packet.BufferArrayToNormalArray(buffer.data);
        // console.log(data);
    }
}

export default Client;