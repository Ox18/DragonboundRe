class Server{
    id;
    name;
    type;
    port;
    players;
    maxPlayers;
    minRank;
    maxRank;


    constructor(){ }

    static fromJSON(json){
        let obj = new Server();
        let keys = Object.keys(json);
        keys.forEach(key => {
            obj[key] = json[key];
        });
        return obj;
    }
}

export default Server;