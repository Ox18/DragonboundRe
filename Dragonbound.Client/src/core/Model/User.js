import ModelLib from "../../Libraries/ModelLib";

class User extends ModelLib{
    constructor(){
        super({
            account_id: 0,
            user_id: 0,
            game_id: "",
            rank: 0,
            gp: 0,
            gold: 0,
            cash: 0,
            gender: "m",
            name_changes: 0,
            country: "",
            gm: 0,
            created_at: Date.now(),
            updated_at: Date.now(),
            // 'location_type', // agregar
            // 'room_number', // agregar

        })
    }
};

export default User;
// 'location_type', // agregar
// 'room_number', // agregar
//   plus10gp
//   'power_user',
//   'tournament',
//   'plus10gp',
//   'mobile_fox',
//   'maps_pack',
//   'megaphones',
//   'lucky_egg_sec_left',
// Obtener valores desde avatares