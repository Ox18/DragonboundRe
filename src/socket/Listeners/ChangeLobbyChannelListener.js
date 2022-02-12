import ModelLib from "../../Libraries/ModelLib";

var schema = {
    account: undefined,
    initial_data: [],
    props: {
        lobby_channel: 0
    }
}

class ChangeLobbyChannelListener extends ModelLib{
    constructor(){
        super(schema)
    }

    init(){
        this.account.lobby_channel = this.props.lobby_channel;

        const messages = this.account.server.chat.filter(message => message.lobby_channel == this.props.lobby_channel);
        const lastMessages = messages.map((msg)=> msg.toArray());
        this.account.send([5, [0, lastMessages], this.account.lobby_channel]);
    }
}

export { ChangeLobbyChannelListener };