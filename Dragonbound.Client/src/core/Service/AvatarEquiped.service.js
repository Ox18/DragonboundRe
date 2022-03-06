import AvatarEquipedRepository from "../Repository/AvatarEquiped.repository";

class AvatarEquipedService {
    repo = new AvatarEquipedRepository();

    async findById(id){
        return this.repo.findById(id);
    }

    async findByQuery(querys){
        return this.repo.findByQuery(querys);
    }
}

export default AvatarEquipedService;