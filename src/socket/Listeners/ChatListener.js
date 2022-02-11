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
        const dado_1 = 0;
        const dado_2 = 0;
        const dado_3 = 0;
        this.account.send([0, message, game_id, chat_type, rank, guild_name, dado_1, dado_2, dado_3]);
    }
}

export { ChatListener };