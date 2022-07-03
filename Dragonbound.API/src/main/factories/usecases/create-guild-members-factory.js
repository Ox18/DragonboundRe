import { DbCreateGuildMembers } from "../../../data/usecases/db-create-guild-members";
    import { Guild-membersRepository } from "@infra/db/sequelize/repositories/guild-members-repository";
    
    export const makeDbCreateGuildMembers = () => {
        return new DbCreateGuildMembers(new Guild-membersRepository());
    }