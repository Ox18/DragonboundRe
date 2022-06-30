import { ok, serverError } from "../helpers/http-helper";
import checknameValidator from "../../main/factories/validators/checkname-validator";

export class ChecknameController {
    constructor(
        findByWhereAccount,
        findByWhereUser
    ) {
        this.findByWhereAccount = findByWhereAccount;
        this.findByWhereUser = findByWhereUser;
    }

    async handle({ query }) {
        const { name } = query;

        try {

            try {
                await checknameValidator.validate({ name });
            } catch (ex) {
                console.log(ex.message);
                return ok("Bad Name");
            }

            const account = await this.findByWhereAccount.findByWhere({ username: name });

            if (account) {
                return ok("Name Exists");
            }

            const user = await this.findByWhereUser.findByWhere({ game_id: name });

            if (user) {
                return ok("Name Exists");
            }

            return ok("OK");

        } catch (ex) {
            return serverError(ex);
        }
    }
}