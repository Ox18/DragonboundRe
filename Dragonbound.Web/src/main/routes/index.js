import indexController from "../../presentation/controllers/index";
import { logoutController } from "../../presentation/controllers/logout-controller";
import { adaptRouteApi } from "../adapters/route-api-adapter";
import { makeAjaxLoginController } from "../factories/controllers/ajax-login-factory-controller";
import { makeAjaxRegisterController } from "../factories/controllers/ajax-register-factory-controller";
import { makeChecknameController } from "../factories/controllers/checkname-factory-controller";
import { makeGestSessionController } from "../factories/controllers/get-session-factory-controller";
import { makeListServersController } from "../factories/controllers/list-servers-factory-controller";

export default (router) => {
    router.get("/", indexController);
    router.get("/s", adaptRouteApi(makeGestSessionController()));
    router.get("/checkName", adaptRouteApi(makeChecknameController()));
    router.post("/ajaxRegister", adaptRouteApi(makeAjaxRegisterController()));
    router.post("/ajaxLogin", adaptRouteApi(makeAjaxLoginController()));
    router.post("/g", logoutController);
    router.get("/w2", adaptRouteApi(makeListServersController()));
    router.get("/api/get_status", (req, res) => {
        res.json([
            1,
            0,
            0
        ])
    })
}