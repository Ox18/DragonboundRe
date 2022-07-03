import { DbUpdateGuildMembers } from "../../../data/usecases/db-update-guild-members";
    import { Guild-membersRepository } from "@infra/db/sequelize/repositories/guild-members-repository";
    
    export const makeDbUpdateGuildMembers = () => {
        return new DbUpdateGuildMembers(new Guild-membersRepository());
    }