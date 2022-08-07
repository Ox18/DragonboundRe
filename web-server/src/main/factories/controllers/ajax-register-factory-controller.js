import { AccountRepository } from "../../../infraestructure/db/repositories/account-repository";
import { UserRepository } from "../../../infraestructure/db/repositories/user-repository";
import { AjaxRegisterController } from "../../../presentation/controllers/ajax-register-controller"
import { AjaxRegisterValidation } from "../validations/ajax-register-validation";

export const makeAjaxRegisterController = () => {
    return new AjaxRegisterController(AccountRepository.create(), UserRepository.create(), AjaxRegisterValidation);
}