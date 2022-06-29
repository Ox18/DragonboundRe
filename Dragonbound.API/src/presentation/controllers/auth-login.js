import { ok, serverError } from "../helpers/http-helper"

export class AuthLoginController {
    constructor(
        findByWhereAccount,
        findByWhereUser
    ) {
        this.findByWhereAccount = findByWhereAccount;
        this.findByWhereUser = findByWhereUser;
    }

    async handle(params) {
        const { body } = params;
        const { u: username, p: password } = body;

        try {
            const account = await this.findByWhereAccount.findByWhere({ username, password });

            if (account === undefined) {
                return ok(0);
            }

            const user = await this.findByWhereUser.findByWhere({ account_id: account.id });

            if (user === undefined) {
                return ok(["User not found", "Please, contact the administrator"]);
            }

            return ok({
                account,
                user
            })

            // this.user_id = a;
            // this.user_rank = b;
            // this.user_auth_key = d;
            // this.user_country = c;
            //return ok([0, 26, "zwpeoriewrwemflwe", "PE", "Alex"]);
        } catch (ex) {
            return serverError(ex);
        }
    }
}