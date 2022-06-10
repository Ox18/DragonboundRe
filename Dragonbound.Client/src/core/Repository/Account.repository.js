import Account from "../Model/Account";
import AccountData from "../Network/data/AccountData";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

class AccountRepository{
    findByUsernameAndPassword(username, password){
        return new Promise(async (resolve, reject)=>{
            try{
                const params = {
                    query: {
                        username,
                        password
                    }
                }
                const response = await this.findByQuery({ params });
                if(response.entries.length > 0){
                    resolve(response.entries[0]);
                }
                else{
                    reject(new ResourceNotFoundException("username: "+username+", password: "+password));
                }
            }catch(ex){
                reject(ex);
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
                const items = AccountData.filter(item => {
                    let result = true;
                    keys.forEach(key => {
                        if(item[key] !== query[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(item => Account.fromHashMap(item));
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

export default AccountRepository;