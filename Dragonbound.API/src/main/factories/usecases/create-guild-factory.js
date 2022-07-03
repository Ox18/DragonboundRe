import { DbCreateGuild } from "../../../data/usecases/db-create-guild";
    import { GuildRepository } from "@infra/db/sequelize/repositories/guild-repository";
    
    export const makeDbCreateGuild = () => {
        return new DbCreateGuild(new GuildRepository());
    }