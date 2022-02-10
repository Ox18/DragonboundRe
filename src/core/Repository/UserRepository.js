import DatabaseMySQL from "../DB/DatabaseMySQL";
import User from "../Model/User";

class UserRepository{
    db = DatabaseMySQL.instance();

    findByAccountId(account_id){
        return new Promise(async (resolve, reject) => {   
            var self = this;
            var sql = "SELECT * FROM `user` WHERE `account_id` = ?";
            var params = [account_id];
            this.db.connection
            .query(sql, params, function(err, result, fields){
                self.db.connection.end();
                if(err){
                    reject(err);
                }
                if(result.length > 0){
                    var user = User.fromHashMap(result[0]);
                    resolve(user);
                }
                else{
                    resolve(null);
                }
            });
        })
    }
}

export default UserRepository;