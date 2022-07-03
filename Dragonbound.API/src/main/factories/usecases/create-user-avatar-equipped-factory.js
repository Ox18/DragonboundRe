import { DbCreateUserAvatarEquipped } from "../../../data/usecases/db-create-user-avatar-equipped";
    import { User-avatar-equippedRepository } from "@infra/db/sequelize/repositories/user-avatar-equipped-repository";
    
    export const makeDbCreateUserAvatarEquipped = () => {
        return new DbCreateUserAvatarEquipped(new User-avatar-equippedRepository());
    }