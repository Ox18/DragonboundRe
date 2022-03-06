import UserData from "../Network/data/UserData";
import User from "../Model/User";
import ResourceNotFoundException from "../Exception/ResourceNotFoundException";

class UserRepository{
    findByAccountId(account_id){
        return new Promise(async (resolve, reject)=>{
            try{
                const users = await this.findByQuery({ account_id });
                if(users.length > 0){
                    resolve(users[0]);
                }
                else{
                    reject(new ResourceNotFoundException("account_id: " + account_id));
                }
            }catch(e){
                reject(e);
            }
        });
    }

    findById(id){
        return new Promise(async (resolve, reject)=>{
            try{
                const user = await this.findByQuery({ id });
                if(user.length > 0){
                    resolve(user[0]);
                }
                else{
                    reject(new ResourceNotFoundException("id: " + id));
                }
            }catch(e){
                reject(e);
            }
        });
    }

    findByQuery(querys){
        return new Promise((resolve, reject)=>{
            const keys = Object.keys(querys);

            try{
                const users = UserData.filter(user => {
                    let result = true;
                    keys.forEach(key => {
                        if(user[key] !== querys[key]){
                            result = false;
                        }
                    }
                    );
                    return result;
                }).map(user => User.fromHashMap(user));
                resolve(users);
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default UserRepository;