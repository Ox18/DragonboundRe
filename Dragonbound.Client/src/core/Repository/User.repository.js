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
}

export default UserRepository;