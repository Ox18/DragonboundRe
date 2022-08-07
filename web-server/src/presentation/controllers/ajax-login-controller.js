import { HTTP_STATUS_CODE, RESPONSE_GENERIC } from "../../consts";
import { AlertifyError } from "../../libraries/alertifyError";

export class AjaxLoginController{
    constructor(
        accountRepository,
        userRepository,
        validation
    ) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.validation = validation;
    }

    async handle(req){

        try{
            await this.validation.validate(req.body);
        }catch(ex){
            return {
                status: HTTP_STATUS_CODE.OK,
                body: AlertifyError.errorsToHTML(ex.errors)
            }
        }
        
        const { u, p } = req.body;

        const account = await this.accountRepository.findOne({ username: u, password: p });

        const detailsUser = await this.userRepository.findOne({ account_id: account?.id });

        if(!account || !detailsUser){
            return RESPONSE_GENERIC.FAIL_LOGIN
        }

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        req.session.user = {
            account_id: account.id,
            username: u,
            ip,
            user_id: detailsUser.id,
            rank: detailsUser.rank,
        };

        return {
            status: HTTP_STATUS_CODE.OK,
            body: [0, detailsUser.rank, req.sessionID, detailsUser.id, u]
        }
    }
}