import { AccountRepository } from "../../../infraestructure/db/repositories/account-repository";
import { UserRepository } from "../../../infraestructure/db/repositories/user-repository";
import { GetSessionController } from "../../../presentation/controllers/get-session-controller"

export const makeGestSessionController = () => {
    return new GetSessionController(AccountRepository.create(), UserRepository.create());
}