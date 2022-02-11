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
            updated_at: Date.now()
        })
    }
};

export default User;



// 'location_type',
//   'room_number',
//   'unlock',
//   'event1',
//   'event2',
//   'photo_url',
//   'guild',
//   'guild_job',
//   'power_user',
//   'tournament',
//   'plus10gp',
//   'mobile_fox',
//   'relationship_status',
//   'relationship_with_id',
//   'relationship_with_rank',
//   'relationship_with_photo',
//   'relationship_with_name',
//   'relationship_with_gender',
//   'maps_pack',
//   'prix_points',
//   'megaphones',
//   'lucky_egg_sec_left',
//   'prix_points_type',
//   'prix_points_reset_price'