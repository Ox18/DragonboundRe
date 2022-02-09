import ModelLib from "../../Libraries/ModelLib";

class User extends ModelLib{
    constructor(){
        super({
            user_id: 0,
            game_id: "",
            rank: 0,
            gp: 0,
            gold: 0,
            cash: 0,
            gender: "m",
            name_changes: 0,
            country: "",
            gm: 0
        })
    }
};

export default User;