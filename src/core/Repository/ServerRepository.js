import DatabaseNEDB from "../DB/DatabaseNEDB";
import Server from "../Model/Server";


class ServerRepository{
    database = DatabaseNEDB.instance("servers");

    findAll(){
        return new Promise(async (resolve, reject) => {
            var servers = [];

            this.database.db.find({}, function(err, docs){
                if(err){
                    reject(err);
                }
                else{
                    docs.forEach(server => {
                        const lastServer = Server.fromHashMap(server);
                        servers.push(lastServer);
                    });
                    resolve(servers);
                }
            });
        });
    }
}

export default ServerRepository;