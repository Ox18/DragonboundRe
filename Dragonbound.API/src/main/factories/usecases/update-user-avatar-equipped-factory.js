import { DbUpdateUserAvatarEquipped } from "../../../data/usecases/db-update-user-avatar-equipped";
    import { User-avatar-equippedRepository } from "@infra/db/sequelize/repositories/user-avatar-equipped-repository";
    
    export const makeDbUpdateUserAvatarEquipped = () => {
        return new DbUpdateUserAvatarEquipped(new User-avatar-equippedRepository());
    }