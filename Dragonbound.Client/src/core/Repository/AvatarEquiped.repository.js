import AvatarEquipedData from "../Network/data/AvatarEquipedData";

class AvatarEquipedRepository{
    findOneByUserId(userId){
        return AvatarEquipedData.find(avatarEquiped => avatarEquiped.user_id === userId);
    }   
}

export default AvatarEquipedRepository;