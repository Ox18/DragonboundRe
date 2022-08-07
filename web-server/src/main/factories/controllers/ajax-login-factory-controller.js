import { AccountRepository } from "../../../infraestructure/db/repositories/account-repository";
import { UserRepository } from "../../../infraestructure/db/repositories/user-repository";
import { AjaxLoginController } from "../../../presentation/controllers/ajax-login-controller"
import { AjaxLoginValidation } from "../validations/ajax-login-validation";

export const makeAjaxLoginController = () => {
    return new AjaxLoginController(AccountRepository.create(), UserRepository.create(), AjaxLoginValidation);
}