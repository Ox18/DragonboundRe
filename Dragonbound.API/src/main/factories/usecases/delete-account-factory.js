import { DbDeleteAccount } from "../../../data/usecases/db-delete-account";
    import { AccountRepository } from "@infra/db/sequelize/repositories/account-repository";
    
    export const makeDbDeleteAccount = () => {
        return new DbDeleteAccount(new AccountRepository());
    }