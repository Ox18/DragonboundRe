import { DbDeleteUserAvatarEquipped } from "../../../data/usecases/db-delete-user-avatar-equipped";
    import { User-avatar-equippedRepository } from "@infra/db/sequelize/repositories/user-avatar-equipped-repository";
    
    export const makeDbDeleteUserAvatarEquipped = () => {
        return new DbDeleteUserAvatarEquipped(new User-avatar-equippedRepository());
    }