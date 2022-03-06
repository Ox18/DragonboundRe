import UserData from "../Network/data/UserData";

class UserRepository{
    findByAccountId(account_id){
        return UserData.find(user => user.account_id === account_id);
    }
}

export default UserRepository;