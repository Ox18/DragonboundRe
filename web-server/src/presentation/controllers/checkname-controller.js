import { HTTP_STATUS_CODE, RESPONSE_CHECKNAME } from "../../consts";

export class ChecknameController {
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
            await this.validation.validate(req.query);
        } catch (ex) {
            return {
                status: HTTP_STATUS_CODE.OK,
                body: RESPONSE_CHECKNAME.BAD_NAME
            }
        }

        const { name } = req.query;

        const existAccount = await this.accountRepository.findOne({ username: name });

        const existUser = await this.userRepository.findOne({ game_id: name });


        if (existAccount || existUser) {
            return {
                status: HTTP_STATUS_CODE.OK,
                body: RESPONSE_CHECKNAME.NAME_EXIST
            }
        }

        return {
            status: HTTP_STATUS_CODE.OK,
            body: RESPONSE_CHECKNAME.OK
        }
    }
}