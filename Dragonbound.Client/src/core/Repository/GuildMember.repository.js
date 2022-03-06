import GuildMemberData from "../Network/data/GuildMember.data";
import GuildMember from "../Model/GuildMember";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

class GuildMemberRepository{
    findByUserId(userId){
        return new Promise(async (resolve, reject)=>{
            try{
                const guildMembers = await this.findByQuery({ user_id: userId });
                if(guildMembers.length > 0){
                    resolve(guildMembers[0]);
                }
                else{
                    reject(new ResourceNotFoundException("user_id: " + userId));
                }
            }catch(e){
                reject(e);
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
                    reject(new ResourceNotFoundException("id: "+ id));
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