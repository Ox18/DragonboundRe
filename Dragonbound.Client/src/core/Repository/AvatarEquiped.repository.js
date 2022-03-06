import AvatarEquipedData from "../Network/data/AvatarEquipedData";
import AvatarEquiped from "../Model/AvatarEquiped";

class AvatarEquipedRepository{
    findOneByUserId(userId){
        return new Promise((resolve, reject)=>{
            const avatarEquiped = AvatarEquipedData.find(avatarEquiped => avatarEquiped.user_id === userId);
            if(avatarEquiped){
                resolve(AvatarEquiped.fromHashMap(avatarEquiped));
            }
            else{
                reject(new Error("AvatarEquiped not found"));
            }
        });
    }   
}

export default AvatarEquipedRepository;