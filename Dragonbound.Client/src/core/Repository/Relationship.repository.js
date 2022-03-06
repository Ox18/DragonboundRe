import RelationshipData from "../Network/data/Relationship.data";
import Relationship from "../Model/Relationship";

class RelationShipRepository{
    findByUserId(userId){
        return new Promise((resolve, reject)=>{
            const relationship = RelationshipData.find(relationship => relationship.user_id === userId);
            if(relationship){
                resolve(Relationship.fromHashMap(relationship));
            }
            else{
                reject(new Error("Relationship not found"));
            }
        });
    }
}

export default RelationShipRepository;