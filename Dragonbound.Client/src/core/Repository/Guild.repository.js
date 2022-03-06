import GuildData from "../Network/data/Guild.data";
import Guild from "../Model/Guild";

class GuildRepository{
    findById(id){
        return new Promise((resolve, reject)=>{
            const guild = GuildData.find(guild => guild.id === id);
            if(guild){
                resolve(Guild.fromHashMap(guild));
            }else{
                reject(new Error("Guild not found"));
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