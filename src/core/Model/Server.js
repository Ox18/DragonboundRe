class Server{
    constructor(id, name, type, port, online, maxPlayer, minRank, maxRank){
        this.id = id;
        this.name = name;
        this.type = type;
        this.port = port;
        this.online = online;
        this.maxPlayer = maxPlayer;
        this.minRank = minRank;
        this.maxRank = maxRank;
    }
}

export default Server;