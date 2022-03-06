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

    findByQuery(querys){
        return new Promise((resolve, reject)=>{
            const keys = Object.keys(querys);

            try{
                const servers = ServerData.filter(server => {
                    let result = true;
                    keys.forEach(key => {
                        if(server[key] !== querys[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(server => Server.fromHashMap(server));
                resolve(servers);
            }catch(ex){
                reject(ex);
            }
        });
    }
};

export default ServerRepository;