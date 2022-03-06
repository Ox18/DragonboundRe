import UserData from "../Network/data/UserData";
import User from "../Model/User";

class UserRepository{
    findByAccountId(account_id){
        return new Promise((resolve, reject)=>{
            try{
                const user = UserData.find(user => user.account_id === account_id);
                if(user){
                    resolve(User.fromHashMap(user));
                }
                else{
                    reject(new Error("User not found"));
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