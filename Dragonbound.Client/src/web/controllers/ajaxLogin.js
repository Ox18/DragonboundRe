import { RESPONSE_WEB } from "../../consts/RESPONSE_WEB";
import AccountService from "../../core/Service/AccountService";
import UserService from "../../core/Service/UserService";

export const post = async (req, res) => {
    var status;
    var user_data;
    var user;
    var dialog = {
        title: "",
        message: "",
    }

    try{
        const sessionId = req.sessionID;

        const accountService = new AccountService();
        const userService = new UserService();

        var { 
            u, // username ✅
            p, // password ✅
            create_account  // number create 0 false 1 true
        } = req.body;
        
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
    }catch(ex){
        status = RESPONSE_WEB.LOGIN.DIALOG;
        dialog.title = "Ha ocurrido un error";
        dialog.message = "Por favor intente de nuevo";
    }

    var data = "";

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
            data = [user.id, user.rank, create_account, user.session, user.game_id, user.gender];
            break;
        case RESPONSE_WEB.LOGIN.DIALOG:
            data = [dialog.title, dialog.message];
            break;
        default:
            data = ["Internal server error", "Please try again later"];
            break;
    };
    
    if(typeof data === "string") res.send(data);
    else res.json(data);
}