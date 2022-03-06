import ServerData from "../Network/data/ServerData";
import Server from "../Model/Server";

class ServerRepository{
    findAll(){
        return new Promise((resolve, reject)=>{
            try{
                const servers = ServerData.map(server => Server.fromHashMap(server));
                resolve(servers);
            }catch(e){
                reject(e);
            }
        });
    }
};

export default ServerRepository;