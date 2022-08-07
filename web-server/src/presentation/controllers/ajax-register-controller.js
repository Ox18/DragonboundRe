import { HTTP_STATUS_CODE } from "../../consts";
import { AlertifyError } from "../../libraries/alertifyError";
import locale from "../../locales/global.json"

export class AjaxRegisterController {
    constructor(
        accountRepository,
        userRepository,
        validation
    ) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.validation = validation;
    }

    async handle(req) {

        try {
            await this.validation.validate(req.body);
        } catch (ex) {
            return {
                status: HTTP_STATUS_CODE.OK,
                body: AlertifyError.errorsToHTML(ex.errors)
            }
        }
        const { name: username, password, gender } = req.body;

        const existAccount = await this.accountRepository.findOne({ username });

        if (existAccount) {
            return {
                status: HTTP_STATUS_CODE.OK,
                body: AlertifyError.errorsToHTML([locale.register.user_exist])
            }
        }

        const account = await this.accountRepository.make({ username, password });

        const detailsUser = await this.userRepository.make({
            account_id: account.id,
            rank: 0,
            country: 'PE',
            game_id: username,
            gender,
            gp: 0,
            gold: 100,
            cash: 100,
            unlock: 0,
            photo_url: 0,
            name_changes: 0
        });

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        req.session.user = {
            account_id: account.id,
            username,
            ip,
            user_id: detailsUser.id
        };

        return {
            status: HTTP_STATUS_CODE.OK,
            body: [0, detailsUser.rank, req.sessionID, detailsUser.id, username]
        }
    }
}