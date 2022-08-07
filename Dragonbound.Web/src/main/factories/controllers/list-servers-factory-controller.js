import { ServerRepository } from "../../../infraestructure/db/repositories/server-repository"
import { ListServersController } from "../../../presentation/controllers/list-servers-controller"

export const makeListServersController = ()=>{
    return new ListServersController(ServerRepository.create());
}