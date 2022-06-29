import { postAuthRegisterService } from "../../../main/services/api/post-auth-register.service";
import { ValidationErrorException } from "../../exceptions/ValidationErrorException";
import createAccountValidator from "../../../main/factories/validators/create-account.validator";

export default async (req, res) => {
    const { body } = req;
    try {
        await createAccountValidator.validate(body);
        const response = await postAuthRegisterService({ name: body.name, password: body.password, gender: body.gender });

        const { type } = response;

        switch (type) {
            case "ACCOUNT_ALREADY_EXISTS":
                throw new ValidationErrorException(["Account already exists"]);
            case "USER_ALREADY_EXISTS":
                throw new ValidationErrorException(["User already exists"]);
            case "REGISTER_SUCCESS":
                const { user, account } = response.data;
                req.session.cookie.expires = false;
                req.session.cookie.maxAge = new Date(Date.now() + (60 * 1000 * 1440));
                req.session.account = account;
                req.session.user = user;
                req.session.auth = { username: body.name, password: body.password };
                res.json([0, user?.rank, req.sessionID, user?.country, user?.game_id]);
                break;
            default:
                throw new Error(`Unknown error`);
        }

    } catch (ex) {
        if (ex.name === "ValidationError") {
            let html = "<ul class='errorlist'>";
            ex.errors.forEach(err => {
                html += `<li>${err}</li>`;
            });
            html += "</ul>";
            res.json(html);
        } else {
            res.json(["Internal server error", "Please try again later"]);
        }

    }
}