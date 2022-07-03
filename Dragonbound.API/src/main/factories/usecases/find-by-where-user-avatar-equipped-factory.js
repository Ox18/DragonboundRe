import { DbFindByWhereUserAvatarEquipped } from "../../../data/usecases/db-find-by-where-user-avatar-equipped";
    import { User-avatar-equippedRepository } from "@infra/db/sequelize/repositories/user-avatar-equipped-repository";
    
    export const makeDbFindByWhereUserAvatarEquipped = () => {
        return new DbFindByWhereUserAvatarEquipped(new User-avatar-equippedRepository());
    }