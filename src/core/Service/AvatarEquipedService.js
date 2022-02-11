import AvatarEquipedRepository from "../Repository/AvatarEquipedRepository";

class AvatarEquipedService {
    repo = new AvatarEquipedRepository();

    async findOneByUserId(userId) {
        return this.repo.findOneByUserId(userId);
    }
}

export default AvatarEquipedService;