import { postAjaxLoginService } from "../../../main/services/api_local/post-ajaxLogin.service";

export default async (req, res) => {
    if (req.session.auth) {
        try {
            const response = await postAjaxLoginService(req.session.auth);
            res.json(response);
        } catch (ex) {
            res.json(["Error occurred", ex.message]);
        }
    } else {
        res.json([0]);
    }
}