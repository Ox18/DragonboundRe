export interface IPlayerInfo{
    user_id?: number;
    location_type?: number;
    room_number?: number;
    game_id?: string;
    rank?: number;
    gp?: number;
    gold?: number;
    cash?: number;
    gender?: string;
    unlock?: number;
    head?: number; // ✅
    body?: number; // ✅
    eyes?: number; // ✅
    flag?: number; // ✅
    background?: number; // ✅
    foreground?: number; // ✅
    event1?: number;
    event2?: number;
    photo_url?: string;
    guild?: string;
    guild_job?: number;
    name_changes?: number;
    power_user?: number;
    tournament?: number;
    plus10gp?: number;
    mobile_fox?: number;
    country?: string;
    relationship_status?: string;
    relationship_with_id?: number;
    relationship_with_rank?: number;
    relationship_with_photo?: string;
    relationship_with_name?: string;
    relationship_with_gender?: string;
    maps_pack?: number;
    prix_points?: number;
    megaphones?: number;
    lucky_egg_sec_left?: number;
    prix_points_type?: number;
    prix_points_reset_price?: number;
}