import { AuthLoginController } from "@presentation/controllers/auth-login";
import { makeDbFindByWhereAccount } from "@main/factories/usecases/find-by-where-account-factory";

export const makeAuthLoginController = () => {
    const controller = new AuthLoginController(makeDbFindByWhereAccount());
    return controller
}