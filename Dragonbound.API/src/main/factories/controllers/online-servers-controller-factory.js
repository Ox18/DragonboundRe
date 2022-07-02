import { OnlineServersController } from "../../../presentation/controllers/online-servers";
import { makeDbFindAllArrayServer } from "../usecases/find-all-array-server-factory";

export const makeOnlineServersController = () => {
    const controller = new OnlineServersController(makeDbFindAllArrayServer());
    return controller
}