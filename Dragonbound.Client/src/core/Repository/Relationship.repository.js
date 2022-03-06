import RelationshipData from "../Network/data/Relationship.data";
import Relationship from "../Model/Relationship";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

class RelationShipRepository{
    findByUserId(userId){
        return new Promise(async (resolve, reject)=>{
            try{
                const relationships = await this.findByQuery({ user_id: userId });
                if(relationships.length > 0){
                    resolve(relationships[0]);
                }
                else{
                    reject(new ResourceNotFoundException(userId));
                }
            }catch(e){
                reject(e);
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
                    reject(new ResourceNotFoundException(id));
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