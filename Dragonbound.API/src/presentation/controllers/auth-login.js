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
            });
        } catch (ex) {
            return serverError(ex);
        }
    }
}