import { ok, serverError } from "../helpers/http-helper"

export class AuthLoginController {
    constructor(
        findByWhereAccount
    ) {
        this.findByWhereAccount = findByWhereAccount;
    }

    async handle(params) {
        const { body } = params;
        const { u: username, p: password } = body;

        try {
            const account = await this.findByWhereAccount.findByWhere({ username, password });

            if (account === undefined) {
                return ok(0);
            }            
            // this.user_id = a;
            // this.user_rank = b;
            // this.user_auth_key = d;
            // this.user_country = c;
            return ok([0, 26, "zwpeoriewrwemflwe", "PE", "Alex"]);
        } catch (ex) {
            return ok(["Error", ex.message]);
        }
    }
}