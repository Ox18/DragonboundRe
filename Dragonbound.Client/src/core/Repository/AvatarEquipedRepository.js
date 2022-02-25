import DatabaseMySQL from "../DB/DatabaseMySQL";
import AvatarEquiped from "../Model/AvatarEquiped";

class AvatarEquipedRepository{
    findOneByUserId(userId){
        var db = DatabaseMySQL.instance();
        return new Promise(async (resolve, reject) => {
            try{
                const sql = "SELECT * FROM AvatarEquipeds WHERE user_id = ?";
                const params = [userId];
                const response = await db.find(sql, params);
                const avatarEquiped = response[0] ? AvatarEquiped.fromHashMap(response[0]) : null;
                if(avatarEquiped){
                    resolve(avatarEquiped);
                }else{
                    throw new Error("AvatarEquiped not found");
                }
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default AvatarEquipedRepository;