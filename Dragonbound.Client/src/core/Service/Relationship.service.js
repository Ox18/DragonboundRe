import RelationShipRepository from "../Repository/Relationship.repository";

class RelationshipService{
    repo = new RelationShipRepository();

    async findById(id){
        return this.repo.findById(id);
    }
    
    async findByQuery(params){
        return this.repo.findByQuery(params);
    }

    async findByUserId(userId){
        return this.repo.findByUserId(userId);
    }
}

export default RelationshipService;