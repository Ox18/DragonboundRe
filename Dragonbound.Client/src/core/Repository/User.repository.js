import UserData from "../Network/data/UserData";
import User from "../Model/User";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";
import ParamNotValidException from "../Exception/ParamNotValidException";

class UserRepository{
    findByAccountId(account_id){
        return new Promise(async (resolve, reject)=>{
            if(account_id === 0 || account_id < 0 || typeof account_id !== "number" || isNaN(account_id)){
                reject(new ParamNotValidException("account_id"));
            }

            const params = {
                query: {
                    account_id
                }
            }

            try{
                const response = await this.findByQuery(params);
                if(response.entries.length > 0){
                    resolve(response.entries[0]);
                }
                else{
                    reject(new ResourceNotFoundException("account_id: "+account_id));
                }
            }catch(e){
                reject(e);
            }
        });
    }

    findById(id){
        return new Promise(async (resolve, reject)=>{

            if(id === 0 || id < 0 || typeof id !== "number" || isNaN(id)){
                reject(new ParamNotValidException("id"));
            }

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
                const items = UserData.filter(item => {
                    let result = true;
                    keys.forEach(key => {
                        if(item[key] !== query[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(item => User.fromHashMap(item));
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

export default UserRepository;