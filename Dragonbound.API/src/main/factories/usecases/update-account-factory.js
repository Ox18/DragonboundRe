import { DbUpdateAccount } from "../../../data/usecases/db-update-account";
    import { AccountRepository } from "@infra/db/sequelize/repositories/account-repository";
    
    export const makeDbUpdateAccount = () => {
        return new DbUpdateAccount(new AccountRepository());
    }