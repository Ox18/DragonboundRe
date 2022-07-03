import { DbUpdateGuild } from "../../../data/usecases/db-update-guild";
    import { GuildRepository } from "@infra/db/sequelize/repositories/guild-repository";
    
    export const makeDbUpdateGuild = () => {
        return new DbUpdateGuild(new GuildRepository());
    }