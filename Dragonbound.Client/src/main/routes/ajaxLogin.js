import { getAuthLoginService } from "../../services/api/get-auth-login.service";

export default (router) => {
    router.post("/ajaxLogin", async (req, res) => {
        try {
            const result = await getAuthLoginService(req.body);
            if (result?.account && result?.user) {
                const { user, account } = result;
                req.session.cookie.expires = false;
                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 1440));
                req.session.account = account;
                req.session.user = user;
                req.session.auth = req.body;
                res.json([0, user?.rank, "token-auth-login", user?.country, user?.game_id]);
            } else {
                res.json(result);
            }
        } catch (ex) {
            res.json(["Error occurred", ex.message]);
        }
    })
}