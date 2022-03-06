import AvatarEquipedData from "../Network/data/AvatarEquipedData";
import AvatarEquiped from "../Model/AvatarEquiped";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

class AvatarEquipedRepository{
    findOneByUserId(userId){
        return new Promise(async (resolve, reject)=>{
            try{
                const avatarEquipeds = await this.findByQuery({ user_id: userId });
                if(avatarEquipeds.length > 0){
                    resolve(avatarEquipeds[0]);
                }
                else{
                    reject(new ResourceNotFoundException("user_id: "+userId));
                }
            }catch(e){
                reject(e);
            }
        });
    }   
    
    findById(id){
        return new Promise(async (resolve, reject)=>{
            try{
                const avatarEquiped = await this.findByQuery({ id });
                if(avatarEquiped.length > 0){
                    resolve(avatarEquiped[0]);
                }
                else{
                    reject(new ResourceNotFoundException("id: "+id));
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
                const avatarEquipeds = AvatarEquipedData.filter(avatarEquiped => {
                    let result = true;
                    keys.forEach(key => {
                        if(avatarEquiped[key] !== querys[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(avatarEquiped => AvatarEquiped.fromHashMap(avatarEquiped));
                resolve(avatarEquipeds);
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default AvatarEquipedRepository;