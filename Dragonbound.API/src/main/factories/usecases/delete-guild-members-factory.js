import { DbDeleteGuildMembers } from "../../../data/usecases/db-delete-guild-members";
    import { Guild-membersRepository } from "@infra/db/sequelize/repositories/guild-members-repository";
    
    export const makeDbDeleteGuildMembers = () => {
        return new DbDeleteGuildMembers(new Guild-membersRepository());
    }