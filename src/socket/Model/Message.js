import ModelLib from "../../Libraries/ModelLib";

var schema = {
    message: "",
    game_id: "",
    chat_type: 0,
    rank: 0,
    guild_name: "",
    dado_1: 0,
    dado_2: 0,
    dado_3: 0,
    lobby_channel: 0
};

class Message extends ModelLib {
    constructor() {
        super(schema);
    }

    init(){

    }

    toArray(){
        return Object.values(this);
    }
}

export default Message;