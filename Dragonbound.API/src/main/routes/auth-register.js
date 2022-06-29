import adaptRoute from "@main/adapters/express-route-adapter";

import { makeAuthRegisterController } from "../factories/controllers/auth-register-controller-factory";

export default (router) => {
    router.post("/auth/register", adaptRoute(makeAuthRegisterController()));
}