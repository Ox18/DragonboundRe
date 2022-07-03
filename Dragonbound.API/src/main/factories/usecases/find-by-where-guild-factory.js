import { DbFindByWhereGuild } from "../../../data/usecases/db-find-by-where-guild";
    import { GuildRepository } from "@infra/db/sequelize/repositories/guild-repository";
    
    export const makeDbFindByWhereGuild = () => {
        return new DbFindByWhereGuild(new GuildRepository());
    }