import Account from "../Model/Account";
import AccountData from "../Network/data/AccountData";

class AccountRepository{
    findByUsernameAndPassword(username, password){
        return Account.fromHashMap( AccountData.find(account => account.username === username && account.password === password));
    }
}

export default AccountRepository;