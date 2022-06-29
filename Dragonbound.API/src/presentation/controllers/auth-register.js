import { ok, serverError } from "../helpers/http-helper";

export class AuthRegisterController {
    constructor(
        findByWhereAccount,
        findByWhereUser,
        createAccount,
        createUser
    ) {
        this.findByWhereAccount = findByWhereAccount;
        this.findByWhereUser = findByWhereUser;
        this.createAccount = createAccount;
        this.createUser = createUser;
    }

    async handle({ body }) {
        const { name, password, gender } = body;

        try {
            const account = await this.findByWhereAccount.findByWhere({ username: name });

            if (account) {
                return ok({
                    type: "ACCOUNT_ALREADY_EXISTS",
                })
            }

            const user = await this.findByWhereUser.findByWhere({ game_id: name });

            if (user) {
                return ok({
                    type: "USER_ALREADY_EXISTS",
                })
            }

            const accountResponse = await this.createAccount.create({ username: name, password });
            const userResponse = await this.createUser.create({
                account_id: accountResponse.id
                , game_id: name, country: '', rank: 0, gender

            });

            return ok({
                type: "REGISTER_SUCCESS",
                data: {
                    account: accountResponse,
                    user: userResponse
                }
            })
        } catch (ex) {
            return serverError(ex);
        }
    }
}