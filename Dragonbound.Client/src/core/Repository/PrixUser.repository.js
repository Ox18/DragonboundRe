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

    findByQuery(querys){
        return new Promise((resolve, reject)=>{
            const keys = Object.keys(querys);
            
            try{
                const prixUsers = PrixUserData.filter(prixUser => {
                    let result = true;
                    keys.foreach(key => {
                        if(prixUser[key] !== querys[key]){
                            result = false;
                        }
                    });
                    return result;
                }).map(prixUser => PrixUser.fromHashMap(prixUser));
                resolve(prixUsers);
            }catch(ex){
                reject(ex);
            }
        });
    }
}

export default PrixUserRepository;