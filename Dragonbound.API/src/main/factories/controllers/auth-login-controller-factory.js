import { AuthLoginController } from "@presentation/controllers/auth-login";
import { makeDbFindByWhereAccount } from "@main/factories/usecases/find-by-where-account-factory";
import { makeDbFindByWhereUser } from "../usecases/find-by-where-user-factory";

export const makeAuthLoginController = () => {
    const controller = new AuthLoginController(makeDbFindByWhereAccount(), makeDbFindByWhereUser());
    return controller
}