import adaptRoute from "@main/adapters/express-route-adapter";

import { makeOnlineServersController } from "../factories/controllers/online-servers-controller-factory";
import { makeOnlineServerItemController } from "../factories/controllers/online-server-item-controller-factory";

export default (router) => {
    router.get("/online-servers", adaptRoute(makeOnlineServersController()));
    router.get("/online-servers/:id", adaptRoute(makeOnlineServerItemController()));
}