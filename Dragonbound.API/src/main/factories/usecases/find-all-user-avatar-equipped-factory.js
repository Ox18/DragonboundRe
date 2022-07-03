import { DbFindAllUserAvatarEquipped } from "../../../data/usecases/db-find-all-user-avatar-equipped";
    import { User-avatar-equippedRepository } from "@infra/db/sequelize/repositories/user-avatar-equipped-repository";
    
    export const makeDbFindAllUserAvatarEquipped = () => {
        return new DbFindAllUserAvatarEquipped(new User-avatar-equippedRepository());
    }