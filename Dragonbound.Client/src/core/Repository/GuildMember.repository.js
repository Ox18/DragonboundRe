import GuildMemberData from "../Network/data/GuildMember.data";
import GuildMember from "../Model/GuildMember";

class GuildMemberRepository{
    findByUserId(userId){
        return new Promise((resolve, reject)=>{
            const guildMember = GuildMemberData.find(guildMember => guildMember.user_id === userId);
            if(guildMember){
                resolve(GuildMember.fromHashMap(guildMember));
            }
            else{
                reject(new Error("GuildMember not found"));
            }
        });
    }
}

export default GuildMemberRepository;