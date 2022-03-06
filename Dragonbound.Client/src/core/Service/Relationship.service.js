import RelationShipRepository from "../Repository/Relationship.repository";

class RelationshipService{
    repo = new RelationShipRepository();

    async findById(id){
        return this.repo.findById(id);
    }
}

export default RelationshipService;