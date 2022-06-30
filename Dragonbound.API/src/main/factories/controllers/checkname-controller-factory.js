import { ChecknameController } from "../../../presentation/controllers/checkname";
import { makeDbFindByWhereUser } from "../usecases/find-by-where-user-factory";
import { makeDbFindByWhereAccount } from "@main/factories/usecases/find-by-where-account-factory";

export const makeChecknameController = () => {
    const controller = new ChecknameController(makeDbFindByWhereAccount(), makeDbFindByWhereUser());
    return controller
}