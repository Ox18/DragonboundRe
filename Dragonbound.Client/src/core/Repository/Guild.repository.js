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
}

export default GuildRepository;