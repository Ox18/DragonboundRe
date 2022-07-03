import { DbFindByWhereGuildMembers } from "../../../data/usecases/db-find-by-where-guild-members";
    import { Guild-membersRepository } from "@infra/db/sequelize/repositories/guild-members-repository";
    
    export const makeDbFindByWhereGuildMembers = () => {
        return new DbFindByWhereGuildMembers(new Guild-membersRepository());
    }