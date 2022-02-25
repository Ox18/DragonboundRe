import Server from "./Server";
import Buffer from "./Buffer";

class Client{
    constructor(
        public connection: any,
        public contextServer: Server
    ){
        connection.on("message", this.onMessage.bind(this));
    }

    onMessage(message: any){
        const buffer = message.toJSON();
        const data = Buffer.BufferArrayToNormalArray(buffer.data);
        console.log(data);
    }
}

export default Client;