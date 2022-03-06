import UserData from "../Network/data/UserData";
import User from "../Model/User";

class UserRepository{
    findByAccountId(account_id){
        return User.fromHashMap(UserData.find(user => user.account_id === account_id));
    }
}

export default UserRepository;