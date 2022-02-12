import ModelLib from "../../Libraries/ModelLib";
import { CHAT_TYPE } from "../../consts/CHAT_TYPE";
import Message from "../Model/Message";

var schema = {
    account: undefined,
    initial_data: [],
    props: {
        message: "", // string
        team: 0,     // ??
        unknown: 0   // ??
    }
}

class ChatListener extends ModelLib{
    constructor(){
        super(schema)
    }

    init(){
        const data = {
            game_id: "Alex",
            message: this.props.message,
            guild_name: "Dev",
            chat_type: CHAT_TYPE.GM,
            rank: 26,
            dado_1: 0,
            dado_2: 0,
            dado_3: 0,
            lobby_channel: this.account.lobby_channel
        }

        const message = Message.fromHashMap(data);

        this.account.server.chat.push(message);

        this.account.send([0, ...message.toArray()]);
    }
}

export { ChatListener };