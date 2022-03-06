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

    findById(id){
        return new Promise(async (resolve, reject)=>{
            try{
                const guildMember = await this.findByQuery({ id });
                if(guildMember.length > 0){
                    resolve(guildMember[0]);
                }
                else{
                    reject(new Error("GuildMember not found"));
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
                const guildMembers = GuildMemberData.filter(guildMember => {
                    let result = true;
                    keys.forEach(key => {
                        if(guildMember[key] !== querys[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(guildMember => GuildMember.fromHashMap(guildMember));
                resolve(guildMembers);
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default GuildMemberRepository;