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
    }
}

export { ChangeLobbyChannelListener };