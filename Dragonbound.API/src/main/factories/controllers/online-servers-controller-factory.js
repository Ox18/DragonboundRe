import { OnlineServersController } from "../../../presentation/controllers/online-servers";
import { makeDbFindAllServer } from "../usecases/find-all-server-factory";

export const makeOnlineServersController = () => {
    const controller = new OnlineServersController(makeDbFindAllServer());
    return controller
}