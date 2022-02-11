import ModelLib from "../../Libraries/ModelLib";
import { CHAT_TYPE } from "../../consts/CHAT_TYPE";

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
        const game_id = "Alex";
        const message = this.props.message;
        const guild_name = "Dev";
        const chat_type = CHAT_TYPE.GM;
        const rank = 26;
        this.account.send([0, message, game_id, chat_type, rank, guild_name, 6, 7, 8])
    }
}

export { ChatListener };