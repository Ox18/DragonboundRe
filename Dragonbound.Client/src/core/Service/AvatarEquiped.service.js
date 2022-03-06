import AvatarEquipedRepository from "../Repository/AvatarEquiped.repository";

class AvatarEquipedService {
    repo = new AvatarEquipedRepository();

    async findOneByUserId(userId) {
        return this.repo.findOneByUserId(userId);
    }
}

export default AvatarEquipedService;