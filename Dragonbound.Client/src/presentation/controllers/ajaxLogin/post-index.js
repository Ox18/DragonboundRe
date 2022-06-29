import { getAuthLoginService } from "../../../main/services/api/get-auth-login.service";

export default async (req, res) => {
    try {
        const response = await getAuthLoginService(req.body);
        const { type } = response;

        switch (type) {
            case "ACCOUNT_NOT_FOUND":
                res.json(0);
                break;
            case "USER_NOT_FOUND":
                res.json(0);
                break;
            case "LOGIN_SUCCESS":
                const { user, account } = response.data;
                req.session.cookie.expires = false;
                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 1440));
                req.session.account = account;
                req.session.user = user;
                req.session.auth = req.body;
                res.json([0, user?.rank, req.sessionID, user?.country, user?.game_id]);
                break;
            default:
                res.json(0);
                break;
        }
    } catch (ex) {
        res.json(["Error occurred", ex.message]);
    }
}