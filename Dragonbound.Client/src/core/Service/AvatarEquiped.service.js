import AvatarEquipedRepository from "../Repository/AvatarEquiped.repository";

class AvatarEquipedService {
    repo = new AvatarEquipedRepository();

    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(params){
        return this.repo.findByQuery(params);
    }
}

export default AvatarEquipedService;