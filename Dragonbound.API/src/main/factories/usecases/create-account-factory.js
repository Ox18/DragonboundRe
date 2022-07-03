import { DbCreateAccount } from "../../../data/usecases/db-create-account";
    import { AccountRepository } from "@infra/db/sequelize/repositories/account-repository";
    
    export const makeDbCreateAccount = () => {
        return new DbCreateAccount(new AccountRepository());
    }