import ModelLib from "../Lib/Model.lib";

class Server extends ModelLib{
    constructor(){
        super({
            id: "",
            name: "",
            type: "",
            port: "",
            players: 0,
            maxPlayers: 0,
            minRank: 0,
            maxRank: 0,
        })
    }
}

export default Server;