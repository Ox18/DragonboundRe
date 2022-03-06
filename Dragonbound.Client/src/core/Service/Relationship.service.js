import RelationShipRepository from "../Repository/Relationship.repository";

class RelationshipService{
    repo = new RelationShipRepository();

    async findById(id){
        return this.repo.findById(id);
    }
    
    async findByQuery(querys){
        return this.repo.findByQuery(querys);
    }
}

export default RelationshipService;