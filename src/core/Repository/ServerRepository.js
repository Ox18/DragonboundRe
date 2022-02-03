import DatabaseMySQL from "../DB/DatabaseMySQL";
import Server from "../Model/Server";

class ServerRepository{
    db = new DatabaseMySQL();

    findAll(){
        return new Promise((resolve, reject) => {
            const servers = [];
            this.db.servers.forEach(server => {
                const lastServer = Server.fromHashMap(server);
                servers.push(lastServer);
            });
            resolve(servers);
        });
    }
}

export default ServerRepository;