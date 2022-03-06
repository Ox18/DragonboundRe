import AvatarEquipedData from "../Network/data/AvatarEquipedData";
import AvatarEquiped from "../Model/AvatarEquiped";

class AvatarEquipedRepository{
    findOneByUserId(userId){
        return AvatarEquiped.fromHashMap(AvatarEquipedData.find(avatarEquiped => avatarEquiped.user_id === userId));
    }   
}

export default AvatarEquipedRepository;