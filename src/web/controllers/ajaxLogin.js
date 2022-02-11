import { RESPONSE_WEB } from "../../consts/RESPONSE_WEB";
import AccountService from "../../core/Service/AccountService";
import UserService from "../../core/Service/UserService";

export const post = async (req, res) => {
    const sessionId = req.sessionID;

    const accountService = new AccountService();
    const userService = new UserService();

    const { 
        u, // username ✅
        p, // password ✅
        r  // remember ??
    } = req.body;

    var status;
    var user_data;
    var user;
    
    const account = await accountService.findByUsernameAndPassword(u, p);

    if(account){
        status = RESPONSE_WEB.LOGIN.SUCCESS;
        user_data = await userService.findByAccountId(account.id);
        user = {
            id: user_data.user_id,
            rank: user_data.rank,
            username: account.username,
            session: sessionId,
            game_id: user_data.game_id,
            gender: user_data.gender
        };
        req.session.user = user;
    }else{
        status = RESPONSE_WEB.LOGIN.ACCOUNT_NOT_EXIST;
    }

    let data = "";

    switch (status) {
        case RESPONSE_WEB.LOGIN.ACCOUNT_NOT_EXIST:
            data = "0";
            break;
        case RESPONSE_WEB.LOGIN.FACEBOOK_CONNECT:
            data = [0];
            break;
        case RESPONSE_WEB.LOGIN.BANNED:
            const reason = "banned by system";
            const time = "FOREVER"; // "FOREVER" = forever | Date.now() = time
            const user_data = [user.id, user.username, user.rank];
            data = [reason, time, user_data];
            break;
        case RESPONSE_WEB.LOGIN.EVENT_OPEN:
            const rest_days = 1E3;
            const rare_data = 1;
            const user_id = user.id;
            data = [rest_days, rare_data, null, user_id];
            break;
        case RESPONSE_WEB.LOGIN.FIND_ACCOUNT:
            data = [99, 0];
            break;
        case RESPONSE_WEB.LOGIN.SUCCESS:
            const create_account = 0; // true = 1 | false = 0
            data = [user.id, user.rank, create_account, user.session, user.game_id, user.gender];
            break;
        case RESPONSE_WEB.LOGIN.DIALOG:
            const title = "title to dialog";
            const description = "description to dialog";
            data = [title, description];
            break;
        default:
            data = ["Internal server error", "Please try again later"];
            break;
    };
    
    if(typeof data === "string") res.send(data);
    else res.json(data);
}