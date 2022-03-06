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

    findAll(){
        return new Promise((resolve, reject)=>{
            try{
                const accounts = AccountData.map(account => Account.fromHashMap(account));
                resolve(accounts);
            }catch(e){
                reject(e);
            }
        });
    }

    findByQuery(querys){
        return new Promise((resolve, reject)=>{
            const keys = Object.keys(querys);

            try{
                const accounts = AccountData.filter(account => {
                    let result = true;
                    keys.forEach(key => {
                        if(account[key] !== querys[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(account => Account.fromHashMap(account));
                resolve(accounts);
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default AccountRepository;