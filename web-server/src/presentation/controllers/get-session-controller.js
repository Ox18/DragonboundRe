import { HTTP_STATUS_CODE, RESPONSE_GENERIC } from "../../consts";

export class GetSessionController {

    constructor(
        accountRepository,
        userRepository
    ) { 
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    async handle(req) {

        if (!req.session.user) {
            return RESPONSE_GENERIC.FAIL_LOGIN;
        }

        const account = await this.accountRepository.findOne({ id: req.session.user.account_id });

        const user = await this.userRepository.findOne({ id: req.session.user.user_id });

        if(!account || !user){
            return RESPONSE_GENERIC.FAIL_LOGIN;
        }

        const { user_id } = req.session.user;

        return {
            status: HTTP_STATUS_CODE.OK,
            body: [1, user.rank, req.sessionID, user_id, user.game_id]
        }
        
    }
}