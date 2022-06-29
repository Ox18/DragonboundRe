import { getAuthLoginService } from "../../services/api/get-auth-login.service";

export default (router) => {
    router.get("/s", async (req, res) => {
        if(req.session.auth){
            try {
                const result = await getAuthLoginService(req.session.auth);
                if (result?.account && result?.user) {
                    const { user, account } = result;
                    req.session.cookie.expires = false;
                    req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 1440));
                    req.session.account = account;
                    req.session.user = user;
                    res.json([0, user?.rank, "token-auth-login", user?.country, user?.game_id]);
                } else {
                    res.json(result);
                }
            } catch (ex) {
                res.json(["Error occurred", ex.message]);
            }
        }else{
            res.json([0]);
        }
    })
}