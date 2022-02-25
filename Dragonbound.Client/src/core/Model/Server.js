import ModelLib from "../../Libraries/ModelLib";

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
            created_at: Date.now(),
            updated_at: Date.now()
        });
    }
}

export default Server;