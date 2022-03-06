import Account from "../Model/Account";
import AccountData from "../Network/data/AccountData";

class AccountRepository{
    findByUsernameAndPassword(username, password){
        return new Promise(async (resolve, reject)=>{
            try{
                const query = { username, password };
                const accounts = await this.findByQuery(query);
                if(accounts.length > 0){
                    resolve(accounts[0]);
                }
                else{
                    reject(new Error("Account not found"));
                }
            }catch(e){
                reject(e);
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

    findById(id){
        return new Promise(async (resolve, reject)=>{
            try{
                const query = { id };
                const accounts = await this.findByQuery(query);
                if(accounts.length > 0){
                    resolve(accounts[0]);
                }
                else{
                    reject(new Error("Account not found"));
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