import PrixUserData from "../Network/data/PrixUser.data";
import PrixUser from "../Model/PrixUser";

class PrixUserRepository{
    findByUserId(userId){
        return new Promise((resolve, reject)=>{
            const prixUser = PrixUserData.find(prixUser => prixUser.user_id === userId);
            if(prixUser){
                resolve(PrixUser.fromHashMap(prixUser));
            }
            else{
                reject(new Error("PrixUser not found"));
            }
        })
    }
}

export default PrixUserRepository;