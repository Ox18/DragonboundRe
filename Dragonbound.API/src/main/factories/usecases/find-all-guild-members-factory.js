import { DbFindAllGuildMembers } from "../../../data/usecases/db-find-all-guild-members";
    import { Guild-membersRepository } from "@infra/db/sequelize/repositories/guild-members-repository";
    
    export const makeDbFindAllGuildMembers = () => {
        return new DbFindAllGuildMembers(new Guild-membersRepository());
    }