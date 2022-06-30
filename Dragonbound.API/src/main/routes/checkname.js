import adaptRoute from "@main/adapters/express-route-adapter";

import { makeChecknameController } from "../factories/controllers/checkname-controller-factory";

export default (router) => {
    router.get("/checkName", adaptRoute(makeChecknameController()));
}