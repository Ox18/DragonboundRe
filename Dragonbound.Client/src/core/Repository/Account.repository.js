import Account from "../Model/Account";
import AccountData from "../Network/data/AccountData";

class AccountRepository{
    findByUsernameAndPassword(username, password){
        return new Promise((resolve, reject)=>{
            const account = AccountData.find(account => account.username === username && account.password === password);
            if(account){
                resolve(Account.fromHashMap(account));
            }else{
                reject(new Error("Account not found"));
            }
        });
    }
}

export default AccountRepository;