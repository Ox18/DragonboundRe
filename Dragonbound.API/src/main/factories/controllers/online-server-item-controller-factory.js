import { OnlineServerItemController } from "../../../presentation/controllers/online-server-item";
import { makeDbFindByWhereServer } from "../usecases/find-by-where-server-factory";

export const makeOnlineServerItemController = () => {
    const controller = new OnlineServerItemController(makeDbFindByWhereServer());
    return controller
}