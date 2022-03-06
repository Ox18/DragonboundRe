import GuildData from "../Network/data/Guild.data";
import Guild from "../Model/Guild";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

class GuildRepository{    
    findById(id){
        return new Promise(async (resolve, reject)=>{
            try{
                const guild = await this.findByQuery({ id });
                if(guild.length > 0){
                    resolve(guild[0]);
                }
                else{
                    reject(new ResourceNotFoundException(id));
                }
            }catch(e){
                reject(e);
            }
        });
    }

    findByQuery(querys){
        return new Promise((resolve, reject)=>{
            const keys = Object.keys(querys);

            try{
                const guilds = GuildData.filter(guild => {
                    let result = true;
                    keys.forEach(key => {
                        if(guild[key] !== querys[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(guild => Guild.fromHashMap(guild));
                resolve(guilds);
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default GuildRepository;