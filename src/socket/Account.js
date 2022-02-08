import AccountHandler from "./Libraries/AccountHandler";
import { CLIENT_OPCODE } from "../consts/CLIENT_OPCODE"; 

import MessageLogin from "./Messages/MessageLogin";

class Account extends AccountHandler{
    constructor(...params){
        super(...params);
    }

    Handler(opcode, data){
        var self = this;
        switch(opcode){
            case CLIENT_OPCODE.login:
                {
                    MessageLogin.listener(self, data);
                    self.Emit(26, []); // Checking Profile
                    self.Emit(27, []); // Checking Avatar
                    self.Emit(1, [[999, 1, 1, 2, 3]]); // user_id,location_type,room_number,game_id,rank,gp,gold,cash,gender,unlock,head,body,eyes,flag,background,foreground,event1,event2,photo_url,guild,guild_job,name_changes,power_user,tournament,plus10gp,mobile_fox,country,relationship_status,relationship_with_id,relationship_with_rank,relationship_with_photo,relationship_with_name,relationship_with_gender,maps_pack,prix_points,megaphones,lucky_egg_sec_left,prix_points_type,prix_points_reset_price
                    self.Emit(1, [[999, 1, 1, "Alex", 26, 10, 10, 10, 10]])
                };
                break;
            default:
                console.log("Unknown opcode: " + opcode);
                break;
        }
    }
}

export default Account;