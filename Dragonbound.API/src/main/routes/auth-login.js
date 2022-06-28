import adaptRoute from "@main/adapters/express-route-adapter";

import { makeAuthLoginController } from "@main/factories/controllers/auth-login-controller-factory";

export default (router) => {
    router.post("/auth/login", adaptRoute(makeAuthLoginController()));
}