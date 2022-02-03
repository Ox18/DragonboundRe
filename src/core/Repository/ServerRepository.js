import DatabaseMySQL from "../DB/DatabaseMySQL";

class ServerRepository{
    db = new DatabaseMySQL();

    findAll(){
        return new Promise((resolve, reject) => {
            const servers = [];
            this.db.servers.forEach(server => {});
        });
    }
}

export default ServerRepository;