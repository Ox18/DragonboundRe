import { DbFindAllGuild } from "../../../data/usecases/db-find-all-guild";
    import { GuildRepository } from "@infra/db/sequelize/repositories/guild-repository";
    
    export const makeDbFindAllGuild = () => {
        return new DbFindAllGuild(new GuildRepository());
    }