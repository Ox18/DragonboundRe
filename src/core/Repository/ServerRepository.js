import DatabaseMySQL from "../DB/DatabaseMySQL";
import Server from "../Model/Server";


class ServerRepository{
    findAll(){
        var db = DatabaseMySQL.instance();
        return new Promise(async (resolve, reject) => {
            const sql = "SELECT * FROM Servers";
            const params = [];
            const response = await db.findAll(sql, params);
            const servers = response.map(server => Server.fromHashMap(server));
            resolve(servers);
        });
    }
}

export default ServerRepository;