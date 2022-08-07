import { AccountRepository } from "../../../infraestructure/db/repositories/account-repository";
import { UserRepository } from "../../../infraestructure/db/repositories/user-repository";
import { ChecknameController } from "../../../presentation/controllers/checkname-controller"
import { ChecknameValidation } from "../validations/checkname-validation";

export const makeChecknameController = () => {
    return new ChecknameController(AccountRepository.create(), UserRepository.create(), ChecknameValidation);
}