import adaptRoute from "@main/adapters/express-route-adapter";

import { makeOnlineServersController } from "../factories/controllers/online-servers-controller-factory";

export default (router) => {
    router.get("/online-servers", adaptRoute(makeOnlineServersController()));
}