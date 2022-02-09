import DatabaseNEDB from "../DB/DatabaseNEDB";
import Account from "../Model/Account";

class AccountRepository{
    database = DatabaseNEDB.instance("accounts").db;

    findByUsernameAndPassword(username, password){
        return new Promise(async (resolve, reject) => {        
            this.database
            .findOne({username: username, password: password}, function(err, doc){
                if(err){
                    reject(err);
                }
                else{
                    if(doc){
                        let lastAccount = Account.fromHashMap(doc);
                        lastAccount.id = doc._id;
                        resolve(lastAccount);
                    }
                    else{
                        resolve(null);
                    }
                }
            });
        })
    }
}

export default AccountRepository;