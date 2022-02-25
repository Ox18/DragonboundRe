import DatabaseMySQL from "../DB/DatabaseMySQL";
import User from "../Model/User";

class UserRepository{
    

    findByAccountId(account_id){
        return new Promise(async (resolve, reject) => {   
            try{
                var db = DatabaseMySQL.instance();
                const sql = "SELECT * FROM `user` WHERE `account_id` = ?";
                const params = [account_id];
                const response = await db.find(sql, params);
                const user = response[0] ? User.fromHashMap(response[0]) : null;
                resolve(user);
            }catch(ex){
                reject(ex);
            }
        })
    }
}

export default UserRepository;