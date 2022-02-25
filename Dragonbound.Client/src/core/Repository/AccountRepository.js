import DatabaseMySQL from "../DB/DatabaseMySQL";
import Account from "../Model/Account";

class AccountRepository{
    findByUsernameAndPassword(username, password){
        var db = DatabaseMySQL.instance();
        return new Promise(async (resolve, reject) => {   
            try{
                var sql = "SELECT * FROM `account` WHERE `username` = ? AND `password` = ?";
                var params = [username, password];
                const response = await db.find(sql, params);
                const account = response[0] ? Account.fromHashMap(response[0]) : null;
                resolve(account);
            }catch(ex){
                reject(ex);
            }
        })
    }
}

export default AccountRepository;