import ModelLib from "../Libraries/ModelLib";
import { LoginListener } from "./Listeners/LoginListener";

import { CLIENT_OPCODE } from "../consts/CLIENT_OPCODE";

var schema = {
    id: undefined,
    server: undefined,
    app: undefined,
    connection: undefined
}

class Account extends ModelLib{
    constructor(){
        super(schema);
    }

    init(){
        this.connection.on("message", this.onMessage.bind(this));
    }

    onMessage(messageUTF8){
        try{
            const lastData = JSON.parse(messageUTF8);
            const opcode = lastData[0];
            const data = lastData.slice(1);
            this.Handle(opcode, data);
        }catch(ex){
            console.log(ex);
            this.disconnect();
        }
    }

    Handle(opcode, data){
        var self = this;
        switch(opcode){
             case CLIENT_OPCODE.login:
                {
                    LoginListener.fromProps({ account: self, data });
                };
                break;
            //  case CLIENT_OPCODE.game_shoot: 
            //     break; 
            //  case CLIENT_OPCODE.getinfo: 
            //     break; 
            //  case CLIENT_OPCODE.game_move: 
            //     break; 
            //  case CLIENT_OPCODE.room_change_team: 
            //     break; 
            //  case CLIENT_OPCODE.pchat: 
            //     break; 
            //  case CLIENT_OPCODE.tab: 
            //     break; 
            //  case CLIENT_OPCODE.room_change_ready: 
            //     break; 
            //  case CLIENT_OPCODE.mobile: 
            //     break; 
            //  case CLIENT_OPCODE.chat: 
            //     break; 
            //  case CLIENT_OPCODE.addfriend: 
            //     break; 
            //  case CLIENT_OPCODE.refresh_guildies: 
            //     break; 
            //  case CLIENT_OPCODE.game_start: 
            //     break; 
            //  case CLIENT_OPCODE.friend_delete: 
            //     break; 
            //  case CLIENT_OPCODE.delete_avatar: 
            //     break; 
            //  case CLIENT_OPCODE.guild_approved: 
            //     break; 
            //  case CLIENT_OPCODE.relationship_change: 
            //     break; 
            //  case CLIENT_OPCODE.room_title: 
            //     break; 
            //  case CLIENT_OPCODE.quick_join: 
            //     break; 
            //  case CLIENT_OPCODE.guild_kick: 
            //     break; 
            //  case CLIENT_OPCODE.tournament_cancel_wait: 
            //     break; 
            //  case CLIENT_OPCODE.team_search_cancel: 
            //     break; 
            //  case CLIENT_OPCODE.equip: 
            //     break; 
            //  case CLIENT_OPCODE.change_info: 
            //     break; 
            //  case CLIENT_OPCODE.channel_rooms: 
            //     break; 
            //  case CLIENT_OPCODE.buy: 
            //     break; 
            //  case CLIENT_OPCODE.get_room_info: 
            //     break; 
            //  case CLIENT_OPCODE.friend_approved: 
            //     break; 
            //  case CLIENT_OPCODE.room_join: 
            //     break; 
            //  case CLIENT_OPCODE.refresh_friends: 
            //     break; 
            //  case CLIENT_OPCODE.game_use_item: 
            //     break; 
            //  case CLIENT_OPCODE.room_options: 
            //     break; 
            //  case CLIENT_OPCODE.guildres: 
            //     break; 
            //  case CLIENT_OPCODE.select_bot: 
            //     break; 
            //  case CLIENT_OPCODE.change_name: 
            //     break; 
            //  case CLIENT_OPCODE.create_team: 
            //     break; 
            //  case CLIENT_OPCODE.get_my_avatars: 
            //     break; 
            //  case CLIENT_OPCODE.game_share: 
            //     break; 
            //  case CLIENT_OPCODE.room_create: 
            //     break; 
            //  case CLIENT_OPCODE.refresh: 
            //     break; 
            //  case CLIENT_OPCODE.tournament_start_game: 
            //     break; 
            //  case CLIENT_OPCODE.change_lobby_channel: 
            //     break; 
            //  case CLIENT_OPCODE.guild_leave: 
            //     break; 
            //  case CLIENT_OPCODE.guildinvite: 
            //     break; 
            //  case CLIENT_OPCODE.guild_create: 
            //     break; 
            //  case CLIENT_OPCODE.relationship_approved: 
            //     break; 
            //  case CLIENT_OPCODE.game_items: 
            //     break; 
            //  case CLIENT_OPCODE.channel_join: 
            //     break; 
            //  case CLIENT_OPCODE.event: 
            //     break; 
            //  case CLIENT_OPCODE.revive: 
            //     break; 
            //  case CLIENT_OPCODE.send_bcm: 
            //     break; 
            //  case CLIENT_OPCODE.game_pass_turn: 
            //     break; 
            //  case CLIENT_OPCODE.get_avatar: 
            //     break; 
            //  case CLIENT_OPCODE.get_shop_page: 
            //     break; 
            //  case CLIENT_OPCODE.get_next_avatar: 
            //     break; 
            //  case CLIENT_OPCODE.pool: 
            //     break; 
            //  case CLIENT_OPCODE.accept_gift_offer: 
            //     break; 
            //  case CLIENT_OPCODE.captcha: 
            //     break; 
            //  case CLIENT_OPCODE.use_exitem: 
            //     break; 
            //  case CLIENT_OPCODE.room_watch: 
            //     break; 
            //  case CLIENT_OPCODE.started_to_shoot: 
            //     break; 
            //  case CLIENT_OPCODE.look: 
            //     break; 
            //  case CLIENT_OPCODE.check_guild_name: 
            //     break; 
            //  case CLIENT_OPCODE.reset_prix_points: 
            //     break;        
            default:
                {
                    console.log("Unknown opcode: " + opcode);
                };
                break;
        }
    }

    disconnect(){
        this.connection.close();
    }

    send(data){
        try{
            const message = JSON.stringify(data);
            this.sendUTF8(message);
        }catch(ex){
            console.log(ex);
        }
    }

    sendUTF8(message){
        this.connection.send(message);
    }
}

export default Account;