import CLIENT_OPCODE from "./consts/CLIENT_OPCODE";
import SERVER_OPCODE from "./consts/SERVER_OPCODE";
import ClientManagement from "./libraries/ClientManagement";
import Packet from "./util/Packet";

var Player = {
    user_id: 1,
            location_type: 1,
            room_number: 0,
            game_id: "Alex",
            rank: 26,
            gp: 100000,
            gold: 10000000,
            cash: 10000000,
            gender: "m",
            unlock: 100,
            head: 1,
            body: 2,
            eyes: 0,
            flag: 0,
            background: 0,
            foreground: 0,
            event1: Date.now(),
            event2: Date.now(),
            photo_url: "https://avatars.githubusercontent.com/u/73305665?v=4",
            guild: "DEV",
            guild_job: 1,
            name_changes: 4,
            power_user: 1,
            tournament: 1,
            plus10gp: 1,
            mobile_fox: 1,
            country: "PE",
            relationship_status: "m",
            relationship_with_id: 1,
            relationship_with_rank: 27,
            relationship_with_photo: "https://avatars.githubusercontent.com/u/73305665?v=4",
            relationship_with_name: "Alex",
            relationship_with_gender: "m",
            maps_pack: 1,
            prix_points: 100,
            megaphones: 1000,
            lucky_egg_sec_left: Date.now() + 1000,
            prix_points_type: 2,
            prix_points_reset_price: 1
}

class Client extends ClientManagement{
    processMessage(MESSAGE_ID: Number, MESSAGE_DATA: Array<any>){
        switch(MESSAGE_ID){
            case CLIENT_OPCODE.login:
                const [
                    hash_connection,
                    user_auth,
                    version_encrypted,
                    user_id,
                    version_client,
                    user_last_location,
                    version_client_web
                ] = MESSAGE_DATA;
                this.sendMessage(SERVER_OPCODE.login_avatars, []);
                this.sendMessage(SERVER_OPCODE.login_profile, []);
                console.log(user_id);
                const data = [1,Object.values(Player)];
                this.connection.send(Packet.Encode(...data));
                break;
            default:
                console.log(MESSAGE_ID, MESSAGE_DATA);
        }
    }
}

export default Client;