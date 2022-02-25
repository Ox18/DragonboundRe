import ModelLib from "../../Libraries/ModelLib";

class GuildMember extends ModelLib{
    constructor(){
        super({
            id: "",
            guild_id: "",
            user_id: 0,
            guild_job: 0,
            created_at: undefined,
            updated_at: undefined
        })
    }
}

export default GuildMember;