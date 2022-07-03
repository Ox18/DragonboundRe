import { DbDeleteGuild } from "../../../data/usecases/db-delete-guild";
    import { GuildRepository } from "@infra/db/sequelize/repositories/guild-repository";
    
    export const makeDbDeleteGuild = () => {
        return new DbDeleteGuild(new GuildRepository());
    }