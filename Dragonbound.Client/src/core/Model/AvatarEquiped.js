import ModelLib from "../../Libraries/ModelLib";

class AvatarEquiped extends ModelLib{
    constructor(){
        super({
            id: 0,
            user_id: 0,
            head: 0,
            body: 0,
            eyes: 0,
            flag: 0,
            background: 0,
            foreground: 0,
        })
    }
};

export default AvatarEquiped;