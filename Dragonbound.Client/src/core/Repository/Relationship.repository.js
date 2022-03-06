import RelationshipData from "../Network/data/Relationship.data";
import Relationship from "../Model/Relationship";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

class RelationShipRepository{
    findByUserId(userId){
        return new Promise(async (resolve, reject)=>{
            const params = {
                query: {
                    user_id: userId
                }
            };

            try{
                const response = await this.findByQuery(params);
                if(response.entries.length > 0){
                    resolve(response.entries[0]);
                }
                else{
                    reject(new ResourceNotFoundException("user_id: "+userId));
                }
            }catch(e){
                reject(e);
            }
        });
    }

    findById(id){
        return new Promise(async (resolve, reject)=>{
            const params = { 
                query: {
                    id
                }
            }
            try{
                const response = await this.findByQuery(params);
                if(response.entries.length > 0){
                    resolve(response.entries[0]);
                }
                else{
                    reject(new ResourceNotFoundException("id: "+id));
                }
            }catch(e){
                reject(e);
            }
        });
    }

    findByQuery({
        query = {},
        offset = 1,
        count = 100
    }){
        return new Promise((resolve, reject)=>{
            const keys = Object.keys(query);

            try{
                const items = RelationshipData.filter(item => {
                    let result = true;
                    keys.forEach(key => {
                        if(item[key] !== query[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(item => Relationship.fromHashMap(item));
                const entries = items.slice((offset - 1) * count, offset * count);
                resolve({
                    entries,
                    total: items.length,
                    count,
                    offset
                });
            }catch(ex){
                reject(ex);
            }
        });
    } 
}

export default RelationShipRepository;