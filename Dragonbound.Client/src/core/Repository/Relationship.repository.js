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

    findById(id){
        return new Promise(async (resolve, reject)=>{
            try{
                const relationship = await this.findByQuery({ id });
                if(relationship.length > 0){
                    resolve(relationship[0]);
                }
                else{
                    reject(new Error("Relationship not found"));
                }
            }
            catch(e){
                reject(e);
            }
        });
    }

    findByQuery(querys){
        return new Promise((resolve, reject)=>{
            const keys = Object.keys(querys);

            try{
                const relationships = RelationshipData.filter(relationship => {
                    let result = true;
                    keys.forEach(key => {
                        if(relationship[key] !== querys[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(relationship => Relationship.fromHashMap(relationship));
                resolve(relationships);
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default RelationShipRepository;