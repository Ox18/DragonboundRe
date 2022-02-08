import ModelLib from "../Libraries/ModelLib";
import AccountStorage from "./AccountStorage";

var schema = {
    id: undefined,
    name: undefined,
    type: undefined,
    port: undefined,
    players: undefined,
    maxPlayers: undefined,
    minRank: undefined,
    maxRank: undefined,
    accountStorage: new AccountStorage()
};

class Server extends ModelLib{
    constructor(){
        super(schema);
    }
}

export default Server;