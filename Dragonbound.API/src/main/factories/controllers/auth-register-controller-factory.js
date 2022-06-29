import { AuthRegisterController } from "../../../presentation/controllers/auth-register";
import { makeDbFindByWhereUser } from "../usecases/find-by-where-user-factory";
import { makeDbFindByWhereAccount } from "@main/factories/usecases/find-by-where-account-factory";
import { makeDbCreateAccount } from "../usecases/create-account-factory";
import { makeDbCreateUser } from "../usecases/create-user-factory";

export const makeAuthRegisterController = () => {
    const controller = new AuthRegisterController(
        makeDbFindByWhereAccount(),
        makeDbFindByWhereUser(),
        makeDbCreateAccount(),
        makeDbCreateUser()
    );
    return controller
}