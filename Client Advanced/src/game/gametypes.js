var _ = require("underscore");
Types = {
    SERVER_OPCODE: {
        chat: 0,
        my_player_info: 1,
        room_players: 2,
        room_state: 5,
        game_start: 7,
        pchat: 8,
        room_update: 3,
        friend_update: 4,
        play: 6,
        hi: 9,
        rooms_list: 10,
        update: 11,
        dead: 12,
        game_over: 13,
        items: 14,
        master_timer: 15,
        my_avatars: 16,
        alert: 17,
        friends: 18,
        guild: 19,
        info: 20,
        friendreq: 21,
        guildreq: 22,
        guildres: 23,
        logout: 24,
        disconnect_reason: 25,
        login_profile: 26,
        login_avatars: 27,
        pass: 28,
        joined: 29,
        left: 30,
        channel_players: 31,
        changed_mobile: 32,
        changed_team: 33,
        changed_ready: 34,
        slot_update: 35,
        player_left: 36,
        enter_room: 37,
        pass_master: 38,
        extra_room_info: 39,
        alert2: 40,
        tournament_wait: 41,
        team_search: 42,
        game_share: 43,
        relationreq: 44,
        show_revive: 45,
        stop_revive: 46,
        ghost: 47,
        revived: 48,
        notichange: 49,
        action: 50,
        avatar_info: 51,
        shop_page: 52,
        next_avatar: 53,
        daily_cash: 54,
        pool: 55,
        captcha: 56,
        game_use_item: 57,
        watcher_joined: 58,
        watcher_left: 59,
        started_to_shoot: 60,
        look: 61,
        replay: 62
    },
    CLIENT_OPCODE: {
        login: 0,
        game_shoot: 1,
        getinfo: 2,
        game_move: 6,
        room_change_team: 7,
        pchat: 8,
        tab: 5,
        room_change_ready: 4,
        mobile: 3,
        chat: 9,
        addfriend: 10,
        refresh_guildies: 11,
        game_start: 12,
        friend_delete: 13,
        delete_avatar: 14,
        guild_approved: 15,
        relationship_change: 16,
        room_title: 17,
        quick_join: 18,
        guild_kick: 19,
        tournament_cancel_wait: 20,
        team_search_cancel: 21,
        equip: 22,
        change_info: 23,
        channel_rooms: 24,
        buy: 25,
        get_room_info: 26,
        friend_approved: 27,
        room_join: 28,
        refresh_friends: 29,
        game_use_item: 30,
        room_options: 31,
        guildres: 32,
        select_bot: 33,
        change_name: 34,
        create_team: 35,
        get_my_avatars: 36,
        game_share: 37,
        room_create: 38,
        refresh: 39,
        tournament_start_game: 40,
        change_lobby_channel: 41,
        guild_leave: 42,
        guildinvite: 43,
        guild_create: 44,
        relationship_approved: 45,
        game_items: 46,
        channel_join: 47,
        event: 48,
        revive: 49,
        send_bcm: 50,
        game_pass_turn: 51,
        get_avatar: 52,
        get_shop_page: 53,
        get_next_avatar: 54,
        pool: 55,
        accept_gift_offer: 56,
        captcha: 57,
        use_exitem: 58,
        room_watch: 59,
        started_to_shoot: 60,
        look: 61
    },
    ALERT2_TYPES: {
        ROOM_DOES_NOT_EXIST: 0,
        ROOM_FULL: 1,
        ROOM_PLAYING: 2,
        WRONG_PASSWORD: 3,
        KICKED: 4,
        MISSING_AVATAR: 5,
        NOT_FOR_SELL: 6,
        BAD_PAYMENT_METHOD: 7,
        BAD_PRICE: 8,
        ALREADY_BUYING: 9,
        ALREADY_HAVE: 10,
        PURCHASED: 11,
        LOCKED_CHALLENGE: 12,
        ALREADY_IN_ROOM: 13,
        WON_EVENT1: 14,
        WON_EVENT2: 15,
        CANT_FRIEND_YOURSELF: 16,
        ADD_FRIEND_OFFLINE: 17,
        ALREADY_FRIENDS: 18,
        CANT_FRIEND_GM: 19,
        ALREADY_ASKED: 20,
        TOO_MANY_FRIENDS_ME: 21,
        TOO_MANY_FRIENDS_HIM: 22,
        FRIEND_REQUEST_SENT: 23,
        FRIEND_ADDED: 24,
        CANT_CHAT_YOURSELF: 25,
        FRIEND_DELETED: 26,
        NOT_IN_GUILD: 27,
        NOT_IN_MY_GUILD: 28,
        NO_KICK_POWER: 29,
        CANT_KICK_YOURSELF: 30,
        KICKED_GUILD: 31,
        CANT_BOSS_PLAYERS: 32,
        ALREADY_IN_GUILD: 33,
        GUILD_BAD_NAME_LEN: 34,
        GUILD_NAME_BAD_WORD: 35,
        GUILD_NO_MONEY: 36,
        GUILD_ALREADY_EXISTS: 37,
        GUILD_CREATED: 38,
        CANT_INVITE_YOURSELF: 39,
        NO_INVITE_POWERS: 40,
        ALREADY_SENT_REQUEST: 41,
        GUILD_IS_FULL: 42,
        GUILD_INVITE_PLAYER_OFFLINE: 43,
        CANT_INVITE_ALREADY_IN_GUILD: 44,
        GUILD_INVITE_SENT: 45,
        JOINED_GUILD: 46,
        GUILD_LEADER_CANT_LEAVE: 47,
        CLOSED_GUILD: 48,
        LEFT_GUILD: 49,
        NAME_SAME: 50,
        NAME_BAD_LEN: 51,
        NAME_FEW_LETTERS: 52,
        NAME_BAD_CHAR: 53,
        NAME_NOT_ENOUGH_CASH: 54,
        NAME_BAD_WORD: 55,
        NAME_NOT_ENOUGH_TIME: 56,
        STILL_PROCESSING_YOUR_LAST_REQUEST: 57,
        NAME_ALREADY_EXISTS: 58,
        NEW_CHALLENGE_UNLOCKED: 59,
        NOT_ENOUGH_CASH: 60,
        NOT_ENOUGH_GOLD: 61,
        AVATAR_WRONG_GENDER: 62,
        TOURNAMENT_NOT_STARTED: 63,
        TOURNAMENT_ENDED: 64,
        GUILDS_LOCK: 65,
        SOMEONE_NOT_READY: 66,
        FEW_PLAYERS: 67,
        NOT_4_SAME_GUILD: 68,
        FEW_PLAYERS4: 69,
        DISQUALIFIED_GUILD: 70,
        DISQUALIFIED_PLAYER: 71,
        NO_GUILD: 72,
        CREATE_ROOM_TOO_FAST: 73,
        RECEIVED_AVATAR: 74,
        NEED_ITEM: 75,
        RELATIONSHIP_REQUEST_SENT: 76,
        CANT_KICK_NON_MEMBER: 77,
        AVATAR_DELETED: 78,
        GIFT_SENT: 79,
        RECEIVER_ALREADY_HAVE: 80,
        CANT_JOIN_GENDER: 81,
        CANT_FRIEND_BLOCKED: 82,
        MUTED: 83,
        ROOM_TITLE_BLOCKED: 84,
        CANT_DUP_CHAT: 85,
        GIFT_NOT_FRIENDS: 86,
        CANT_JOIN_HAVE_AVATAR: 87,
        CANT_JOIN_HAVE_DELETED_AVATAR: 88,
        CANT_JOIN_NEED_AVATAR: 89,
        CANT_JOIN_HAVE_ALL_GM_GIFTS: 90,
        CANT_JOIN_RANK: 91,
        CREATE_ROOM_TOO_MANY: 92,
        NEED_DIFFERENT_MOBILES: 93,
        TOO_MANY_REQUESTS: 94
    },
    THOR_LEVEL: [0, 300, 900, 1800, 3200, 6E3],
    DISCONNECT_REASON_INACTIVE: 1,
    DISCONNECT_REASON_FULL: 2,
    DISCONNECT_REASON_CHANGED_CHANNEL: 3,
    DISCONNECT_REASON_BAD_CLIENT: 4,
    CHAT_TYPE: {
        NORMAL: 0,
        GIFT: 1,
        DEAD: 2,
        GOLD: 3,
        POWER_USER: 4,
        GM: 5,
        SYSTEM: 6,
        BUGLE: 7,
        LOSE_LIFE: 8,
        GM_BUGLE: 9,
        NORMAL_TEAM: 10,
        POWER_USER_TEAM: 11,
        LOVE: 12,
        BREAK_UP: 13,
        AUDIO: 14,
        AUDIO_PU: 15,
        AUDIO_GM: 16,
        BOT: 17,
    },
    MOBILE: {
        ARMOR: 0,
            ICE: 1,
            ADUKA: 2,
            LIGHTNING: 3,
            BIGFOOT: 4,
            JD: 5,
            ASATE: 6,
            RANDOM: 7,
            KNIGHT: 8,
            FOX: 9,
            DRAGON: 10,
            NAK: 11,
            TRICO: 12,
            MAGE: 13,
            TURTLE: 14,
            BOOMER: 15,
            ELECTRICO: 16,
            GRUB: 17,
            DRAGON2: 18,
            RAON: 19,
            RANDOMIZER: 20,
            FROG: 21,
            KALSIDDON: 22
    },
    BULLETS: {
        ARMOR1: 0,
        ARMOR2: 1,
        ARMORSS: 2,
        ARMORSS2: 3,
        ICE1: 4,
        ICE2: 5,
        ICESS: 6,
        ADUKA1_THOR: 7,
        ADUKA2: 8,
        ADUKASS: 9,
        TELEPORT: 10,
        LIGHTNING12: 11,
        LIGHTNINGSS: 12,
        BIGFOOT1: 13,
        BIGFOOT2: 14,
        BIGFOOTSS: 15,
        JD1: 16,
        JD2: 17,
        JDSS: 18,
        ASATE1: 19,
        ASATE2: 20,
        ASATESS: 21,
        ASATEION: 22,
        KNIGHT1: 23,
        KNIGHT2: 24,
        KNIGHTSS: 25,
        KNIGHTION: 26,
        TEST: 27,
        FOX1: 28,
        FOX2: 29,
        FOXSS: 30,
        DRAGON1: 31,
        DRAGON2: 32,
        DRAGONSS: 33,
        NAK1: 34,
        NAK2: 35,
        NAK2UG: 36,
        NAKSS: 37,
        TRICO1: 38,
        TRICO2: 39,
        TRICOSS: 40,
        MAGE1: 41,
        MAGE2A: 42,
        MAGE2B: 43,
        MAGESS: 44,
        TURTLE1: 45,
        TURTLE2A: 46,
        TURTLE2B: 47,
        TURTLESS: 48,
        TURTLESS2: 49,
        BOOMER12: 50,
        BOOMERSS: 51,
        GRUB1: 52,
        GRUB2: 53,
        GRUBSS: 54,
        RAON1: 55,
        RAON2: 56,
        RAONSS: 57,
        RAONBABY: 58
    },
    EXPLODE: {
        ARMOR1: 0,
        ARMOR2: 1,
        ARMORSS: 2,
        ICE1: 3,
        ICE2: 4,
        ICESS: 5,
        ADUKA1_THOR: 6,
        TELEPORT: 7,
        LIGHTINING12_JD1: 8,
        LIGHTNINGSS: 9,
        BIGFOOT1SS: 10,
        BIGFOOT2: 11,
        JD2: 12,
        JDSS: 13,
        ASATE1: 14,
        ASATE2: 15,
        ASATESS: 16,
        KNIGHT: 17,
        TEST: 18,
        FOX1: 19,
        FOX2: 20,
        FOXSS: 21,
        DRAGON1: 22,
        DRAGON2: 23,
        DRAGONSS: 24,
        NAK1: 25,
        NAK2: 26,
        NAKSS: 27,
        TRICO1: 28,
        TRICO2: 29,
        TRICOSS: 30,
        MAGE1: 31,
        MAGE2: 32,
        MAGESS: 33,
        TURTLE1: 34,
        TURTLE2: 35,
        TURTLESS: 36,
        TURTLESS2: 37,
        BOOMER12: 38,
        BOOMERSS: 39,
        BOOMERSS_CHANGE: 40,
        GRUB1: 41,
        GRUB2: 42,
        GRUBSS: 43,
        DRAGONF: 44,
        DRAGON2_1: 45,
        DRAGON2_2: 46,
        RAON1: 47,
        RAON2: 48,
        RAONSS: 49,
        ELECTRIC: 50,
        SUN: 51
    },
    MOBILES: [],
    LOCATION: {
        UNKNOWN: 0,
        CHANNEL: 1,
        ROOM: 2
    },
    START_GAME_PLAYER: {
        n: 0,
        user_id: 1,
        name: 2,
        guild: 3,
        rank: 4,
        x: 5,
        y: 6,
        hp: 7,
        shield: 8,
        shield_regen: 9,
        minang: 10,
        maxang: 11,
        lastturn: 12,
        mobile: 13,
        avatars: 14,
        aim_s1_ang: 15,
        aim_s1_len: 16,
        aim_s2_ang: 17,
        aim_s2_len: 18,
        aim_ss_ang: 19,
        aim_ss_len: 20,
        relationship_status: 21,
        country: 22
    },
    RECORDER_STATUS: {
        NO_INIT: 0,
        READY_TO_RECORD: 1,
        ASKING_PERMISSION: 2,
        RECORDING: 4,
        PROCESSING: 5,
        LISTEN: 6,
        READING_FILE: 7,
        SENDING: 8
    },
    AVATAR_ID_POWER_USER: 464,
    AVATAR_ID_POWER_USER_BG: 465,
    CHALLENGES: {
        WIN_RATE: 0,
        WEEKLY_RANKINGS: 1,
        GUILDS_RANKINGS: 2,
        ACTIVE_DAYS: 3,
        AVATARS: 4,
        FRIENDS: 5,
        FACEBOOK: 6,
        LEVEL: 7
    },
    ZINDEX: {
        ground: 1,
        player: 1E3,
        player_info: 2E3,
        explode: 3E3,
        thor_shot: 3001,
        thor: 3002,
        lightning: 3003,
        shot: 3004,
        ground_parts: 3005,
        damage: 3006,
        textBubble: 3007
    },
    LOW_FPS: 20,
    E_PLAY: {
        next_turn_number: 0,
        player_number: 1,
        x: 2,
        y: 3,
        look: 4,
        add_delay: 5,
        next_turn_of_player: 6,
        chat: 7,
        thor_x: 8,
        thor_y: 9,
        thor_angle: 10,
        thor_damage: 11,
        new_weather: 12,
        wind_power: 13,
        wind_angle: 14,
        shots: 15,
        gold: 16
    },
    /*E_PASS: {
        next_turn_number: 0,
        player_number: 1,
        x: 2,
        y: 3,
        look: 4,
        add_delay: 5,
        next_turn_of_player: 6,
        chat: 7,
        thor_x: 8,
        thor_y: 9,
        thor_angle: 10,
        thor_damage: 11,
        new_weather: 12,
        wind_power: 13,
        wind_angle: 14
    },*/
    STATIC_DIR2: {
        LOCATION_TYPE_UNKNOWN: 0,
        LOCATION_TYPE_CHANNEL: 1,
        LOCATION_TYPE_ROOM: 2,
        ROOM_TYPE_CHANNEL: 0,
        ROOM_TYPE_GAME: 1,
        ROOM_STATUS_WAITING: 0,
        ROOM_STATUS_FULL: 1,
        ROOM_STATUS_PLAYING: 2,
        GUI_LOCATION_CHANNEL: 1,
        GUI_LOCATION_ROOM: 2,
        GUI_LOCATION_GAME: 3,
        GUI_LOCATION_SHOP: 4,
        ITEM_NONE: -1,
        ITEM_DUAL: 0,
        ITEM_TELEPORT: 1,
        ITEM_DUAL_PLUS: 2,
        ITEM_CLASS: ["itemDual", "itemTeleport", "itemDualP"],
        ITEM_SIZE: [2, 2, 2],
        DIR_LEFT: 0,
        DIR_RIGHT: 1,
        /* PLAYER_LOOK_LEFT : DIR_LEFT,
         PLAYER_LOOK_RIGHT : DIR_RIGHT*/
        SHOT1: 0,
        SHOT2: 1,
        SHOTSS: 2,
        AVATAR_TYPE_HEAD: "h",
        AVATAR_TYPE_BODY: "b",
        AVATAR_TYPE_EYES: "g",
        AVATAR_TYPE_FLAG: "f",
        AVATAR_TYPE_BACKGROUND: "1",
        AVATAR_TYPE_FOREGROUND: "2",
        AVATAR_TYPE_EXITEM: "x"
    },
    /*ATAR_TYPE_TO_NUMBER : {
        h: 0,
        b: 1,
        g: 2,
        f: 3,
        1: 4,
        2: 5,
        x: 6
    },*/
    AVATAR_TYPE_TO_STRING: {
        h: "Head",
        b: "Body",
        g: "Glass",
        f: "Flag",
        1: "Background",
        2: "Foreground",
        x: "ExItem"
    },
    AVATAR_NAKED_HEAD_MALE: 1,
    AVATAR_NAKED_BODY_MALE: 2,
    AVATAR_NAKED_HEAD_FEMALE: 3,
    AVATAR_NAKED_BODY_FEMALE: 4,
    AVATAR_INDEX_N: 0,
    AVATAR_INDEX_TYPE: 1,
    AVATAR_INDEX_GENDER: 2,
    AVATAR_INDEX_NAME: 3,
    AVATAR_INDEX_SHOP: 4,
    AVATAR_INDEX_NOTE: 5,
    AVATAR_INDEX_GOLD_WEEK: 6,
    AVATAR_INDEX_GOLD_MONTH: 7,
    AVATAR_INDEX_GOLD_PERM: 8,
    AVATAR_INDEX_CASH_WEEK: 9,
    AVATAR_INDEX_CASH_MONTH: 10,
    AVATAR_INDEX_CASH_PERM: 11,
    AVATAR_INDEX_STAT_POP: 12,
    AVATAR_INDEX_STAT_TIME: 13,
    AVATAR_INDEX_STAT_ATK: 14,
    AVATAR_INDEX_STAT_DEF: 15,
    AVATAR_INDEX_STAT_LIFE: 16,
    AVATAR_INDEX_STAT_ITEM: 17,
    AVATAR_INDEX_STAT_DIG: 18,
    AVATAR_INDEX_STAT_SHLD: 19,
    AVATAR_INDEX_GRAPHICS: 20,
    AVATAR_INDEX_GLOW: 21,
    AVATAR_INDEX_URL: 22,
    GAME_MODE_NORMAL: 0,
    GAME_MODE_BOSS: 1,
    GAME_MODE_SAME: 2,
    GAME_MODE_SCORE: 3,
    GAME_MODE_NAMES: ["NORMAL", "BOSS", "SAME", "SCORE"],
    GAME_MODE_NAMES_LOWER: ["Normal", "Boss", "Same", "Score"],
    //GAME_MODES : GAME_MODE_NAMES.length,
    CHAT_LENGTH_LIMIT: 150,
    GENDER_MALE: "m",
    GENDER_FEMALE: "f",
    GENDER_ALL: "a",
    GENDER_FROM_NUMBER: ["m", "f", "a"],
    GENDER_TO_STRING: {
        m: "Male",
        f: "Female",
        a: "All"
    },
    TEAM_A: 0,
    TEAM_B: 1,
    TIE: 2
        //, MS_IN_1_HOUR : 36E5
        // , MS_IN_1_DAY : 24 * MS_IN_1_HOUR
        ,
    RANK_GM: 26,
    RANK_MOD: 27,
    RANK_BRONE_CUP: 28,
    RANK_SILVER_CUP: 29,
    RANK_GOLD_CUP: 30,
    RANK_VIP: 31
        // , MAX_RANK : RANK_VIP
        ,
    WEATHER_THOR: 0,
    WEATHER_WIND_CHANGE: 1,
    WEATHER_NOITEMS: 2,
    WEATHER_SUN: 3,
    WEATHER_LIGHTNING: 4,
    WEATHER_BLACK: 5,
    WEATHER_RANDOM: 6,
    WEATHER_MIRROR: 7,
    WEATHER_TORNADO: 8,
    WEATHER_NONE: 9,
    WEATHER_MOON: 10,
    WEATHER_LAND: 11,
    WEATHER_NAME: [],
    /*WEATHER_NAME[WEATHER_LIGHTNING]: "Lightning",
    WEATHER_NAME[WEATHER_SUN]: "Force",
    WEATHER_NAME[WEATHER_BLACK]: "Black",
    WEATHER_NAME[WEATHER_TORNADO]: "Tornado",
    WEATHER_NAME[WEATHER_RANDOM]: "Random",
    WEATHER_NAME[WEATHER_MIRROR]: "Mirror",*/
    SUDDEN_DEATH_DOUBLE: 1,
    SUDDEN_DEATH_BIGBOMB: 2,
    SUDDEN_DEATH_SS: 3,
    ROOM: {
        CHANNEL: 0,
        GAME: 1
    },
    /*TIME_SECOND: 1E3,
    TIME_MINUTE : 60 * 1E3,
    TIME_HOUR: 60 * TIME_MINUTE,
    TIME_DAY: 24 * TIME_HOUR,
    TIME_WEEK: 7 * TIME_DAY,
    TIME_MONTH: 30 * TIME_DAY,
    TIME_YEAR: 365 * TIME_DAY,*/
    ROOM_STATUS: {
        WAITING: 0,
        FULL: 1,
        PLAYING: 2
    },
    ITEM: {
        NONE: -1,
        DUAL: 0,
        TELEPORT: 1,
        DUAL_PLUS: 2
    },
    DIR: {
        LEFT: 0,
        RIGHT: 1
    },
    GAMEMSG: {
        winning_award: 0,
        losing_consolation: 1,
        x_killed_y: 2,
        x_bunge_y: 3,
        ultra_high_ang: 4,
        high_ang: 5,
        excellent_shot: 6,
        good_shot: 7,
        shot_bonus: 8,
        team_damage_penalty: 9,
        killed_by_sd: 10,
        died_by_tele: 11,
        damage_1000: 12,
        damage_2000: 13,
        damage_3000: 14,
        triple_kill: 15,
        double_kill: 16,
        ending_bonus: 17,
        bunge_bonus: 18,
        suicide_penalty: 19,
        unlocked_challenge: 20,
        free_kill_detected: 21,
        suicide_penalty_bunge: 22,
        team_kill_penalty: 23,
        winning_change: 24,
        early_suicide: 25,
        blocked_winning: 26,
        score_change: 27
    },
    MAP: {
        CUSTOM: -2,
        RANDOM: -1,
        MIRAMO: 0,
        NIRVANA: 1,
        METRO: 2,
        SEA: 3,
        ADIUM: 4,
        DRAGON: 5,
        COZY: 6,
        DUMMY: 7,
        STAR: 8,
        METAMINE: 9,
        CAVE: 10,
        SECRET: 11,
        ICECAVE: 12,
        TREEOFLIFE: 13,
        ICEFISH: 14,
        SOCCER: 15,
        CANDY: 16,
        MONSTER: 17,
        MIRAMO2: 18,
        NIRVANA2: 19,
        METRO2: 20,
        SEA2: 21,
        AUDIM2: 22,
        DRAGON2: 23,
        COZY2: 24,
        DUMMY2: 25,
        STAR2: 26,
        METAMINE2: 27,
        LOVEYOU: 28,
        LOVEYOU2: 29,
        LOND: 30,
        LOND2: 31,
        DESERT: 32,
        DESERT2: 33,
        GRAY: 34,
        GRAY2: 35,
        JUNGLE: 36,
        JUNGLE2: 37,
        MYROOM: 38,
        MYROOM2: 39,
        DUMMY3: 40,
        ADIUM3: 41,
        MEGAMINE: 42,
        MINIMINE: 43,
        CULTURE: 44,
        PURPLEMINE: 45,
        HALLOWEEN: 46,
        CLOCKTOWER: 47,
        CLOCKTOWER2: 48,
        XMASCAKE: 49,
        NUMBER_OF_MAPS: 50
    },
    //g_options_map :
    //MAP.RANDOM, 
    //g_custom_map,
    g_max_players: 8,
    //g_game_mode : GAME_MODE_NORMAL,
    //g_add_bot_to_slot,
    RANK_FOR_DISABLE_TELE: 11,
    RANK_FOR_DISABLE_DUAL_PLUS: 10,
    RANK_FOR_DISABLE_S1: 9,
    RANK_FOR_RANDOM_TEAMS: 7,
    RANK_FOR_CUSTOM_MAP: 13,
    RANK_FOR_TURN_TIME: 15,
    g_room_options_wind: 0,
    PERIOD: {
        WEEK: 0,
        MONTH: 1,
        PERM: 2,
    },
    GAME_MODE: {
        NORMAL: 0,
        BOSS: 1,
        SAME: 2,
        SCORE: 3,
    },
    GAME_ID: ["Mendax", "Betax", "DN", "Zamy"],
    // 0,1 ,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,43
    MAPS_PLAY: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 19, 20, 22, 25, 27, 29, 34, 35, 41, 42, 43],
    BOT_RANDOM: [0, 1, 2, 3],
    AVATAR_SENT: [42874, 6463, 6464, 6467, 6465],
    MAPS_PLAY_BOSS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 19, 20, 22, 25, 27, 29, 34, 41, 42, 43],
};
Types.MOBILES = [{
    name: "Armor",
    file: "Armor",
    player_x: 17,
    player_y: -28,
    explodes: [Types.EXPLODE.ARMOR1, Types.EXPLODE.ARMOR2, Types.EXPLODE.ARMORSS],
    bullets: [Types.BULLETS.ARMOR1, Types.BULLETS.ARMOR2, Types.BULLETS.ARMORSS, Types.ARMORSS2],
    graphics: [
        [49, 43, 24, 39]
    ],
    minang: 10,
    maxang: 55,
    ax: 73.5, //  bug [ balas ] determinacion de variable 
    ay: 0.74,
    bx: 0, // viento '0'
    by: 398, // sin determinacion
    aim: [
        [52, 33],
        [52, 33],
        [52, 33]
    ]
    //{"a":73.5,"b":0.74,"name":"Armor","max":55,"min":10,"mobilename":"armor","aim":[[52,33],[52,33],[52,33]]}
}, {
    name: "Gum",
    file: "gum",
    player_x: -5,
    player_y: -40,
    explodes: [Types.EXPLODE.ICE1, Types.EXPLODE.ICE2, Types.EXPLODE.ICESS],
    bullets: [Types.BULLETS.ICE1, Types.BULLETS.ICE2, Types.BULLETS.ICESS],
    graphics: [
        [53, 55, 30, 53]
    ],
    minang: 20,
    maxang: 70,
    ax: 65,
    ay: 0.625,
    bx: 0, // viento
    by: 384,
    aim: [
        [58, 50],
        [40, 40],
        [40, 40]
    ]
    //{"a":62.5,"b":0.625,"name":"Ice","max":70,"min":20,"mobilename":"ice","aim":[[58,50],[40,40],[40,40]]}
}, {
    name: "Aduka",
    file: "aduka",
    player_x: -7,
    player_y: -24,
    explodes: [Types.EXPLODE.ADUKA1_THOR, 0, 0],
    bullets: [Types.BULLETS.ADUKA1_THOR, Types.BULLETS.ADUKA2, Types.BULLETS.ADUKASS],
    graphics: [
        [56, 39, 23, 34]
    ],
    minang: 110,
    maxang: 170,
    ax: 62.5,
    ay: 0.69,
    bx: 0, // viento
    by: 392,
    aim: [
        [130, 40],
        [130, 40],
        [130, 40]
    ]
    //{"a":62.5,"b":0.69,"name":"Aduka","max":170,"min":110,"mobilename":"aduka","aim":[[130,40],[130,40],[130,40]]}
}, {
    name: "Thunder",
    file: "thunder",
    player_x: 3,
    player_y: -37,
    explodes: [Types.EXPLODE.LIGHTINING12_JD1, Types.EXPLODE.LIGHTINING12_JD1, Types.EXPLODE.LIGHTNINGSS],
    bullets: [Types.BULLETS.LIGHTNING12, Types.BULLETS.LIGHTNING12, Types.BULLETS.LIGHTNINGSS],
    graphics: [
        [69, 43, 32, 40]
    ],
    minang: 18,
    maxang: 40,
    ax: 65,
    ay: 0.72,
    bx: 0, // viento 
    by: 393,
    aim: [
        [58, 44],
        [58, 44],
        [58, 44]
    ]
    //{"a":65,"b":0.72,"name":"Lightning","max":40,"min":18,"mobilename":"lightning","aim":[[58,44],[58,44],[58,44]]}
}, {
    name: "RedFoot",
    file: "redfoot2",
    player_x: 5,
    player_y: -32,
    explodes: [0, Types.EXPLODE.BIGFOOT2, Types.EXPLODE.BIGFOOT1SS],
    bullets: [Types.BULLETS.BIGFOOT1, Types.BULLETS.BIGFOOT2, Types.BULLETS.BIGFOOTSS],
    graphics: [
        [76, 47, 28, 42]
    ],
    minang: 20,
    maxang: 45,
    ax: 88,
    ay: 0.74,
    bx: 0, // viento
    by: 396,
    aim: [
        [58, 50],
        [58, 50],
        [58, 50]
    ]
    //{"a":88,"b":0.74,"name":"BigFoot","max":45,"min":20,"mobilename":"bigfoot","aim":[[58,50],[58,50],[58,50]]}
}, {
    name: "D.J",
    file: "dj",
    player_x: 11,
    player_y: -34,
    explodes: [Types.EXPLODE.LIGHTINING12_JD1, Types.EXPLODE.JD2, Types.EXPLODE.JDSS],
    bullets: [Types.BULLETS.JD1, Types.BULLETS.JD2, Types.BULLETS.JDSS],
    graphics: [
        [73, 50, 46, 46]
    ],
    minang: 15,
    maxang: 65,
    ax: 62.5,
    ay: 0.625,
    bx: 0, // viento
    by: 387,
    aim: [
        [68, 45],
        [68, 45],
        [68, 45]
    ]
    //{"a":62.5,"b":0.625,"name":"J.D","max":65,"min":15,"mobilename":"jd","aim":[[68,45],[68,45],[68,45]]}
}, {
    name: "A.Sate",
    file: "ufo",
    player_x: 13,
    player_y: -30,
    explodes: [Types.EXPLODE.ASATE1, Types.EXPLODE.ASATE2, Types.EXPLODE.ASATESS],
    bullets: [Types.BULLETS.ASATE1, Types.BULLETS.ASATE2, Types.BULLETS.ASATESS, Types.BULLETS.ASATEION],
    graphics: [
        [64, 55, 32, 48]
    ],
    ion_file: "asateIon",
    ion_graphics: [
        [32, 19, 16, 9]
    ],
    minang: 20,
    maxang: 60,
    ax: 76,
    ay: 0.765,
    bx: 0, // viento
    by: 412,
    aim: [
        [40, 30],
        [40, 30],
        [40, 30]
    ]
    //{"a":76,"b":0.765,"name":"A.Sate","max":60,"min":20,"mobilename":"asate","aim":[[40,30],[40,30],[40,30]]}
}, {
    name: "Random",
    file: "random2",
    player_x: 8,
    player_y: -38,
    graphics: [
        [33, 47, 20, 50]
    ],
    //falta definir
    minang: 20,
    maxang: 60,
    ax: 81,
    ay: 0.827,
    bx: 0, // viento
    by: 329,
    aim: [
        [40, 30],
        [40, 30],
        [40, 30]
    ]
}, {
    name: "Knight",
    file: "knight",
    player_x: -6,
    player_y: -38,
    explodes: [Types.EXPLODE.KNIGHT, Types.EXPLODE.KNIGHT, Types.EXPLODE.KNIGHT],
    bullets: [Types.BULLETS.KNIGHT1, Types.BULLETS.KNIGHT2, Types.BULLETS.KNIGHTSS, Types.BULLETS.KNIGHTION],
    graphics: [
        [58, 51, 35, 49]
    ],
    ion_file: "knightIon",
    ion_graphics: [
        [32, 15, 16, 8]
    ],
    //falta definir
    minang: 20,
    maxang: 60,
    ax: 65.5,
    ay: 0.695,
    bx: 0, // viento
    by: 360,
    aim: [
        [40, 30],
        [40, 30],
        [40, 30]
    ]
}, {
    name: "Fox",
    file: "fox",
    player_x: -2,
    player_y: -31,
    explodes: [Types.EXPLODE.FOX1, Types.EXPLODE.FOX2, Types.EXPLODE.FOXSS],
    bullets: [Types.BULLETS.FOX1, Types.BULLETS.FOX2, Types.BULLETS.FOXSS],
    graphics: [
        [93, 54, 42, 49]
    ],
    //falta definir
    minang: 20,
    maxang: 60,
    ax: 61,
    ay: 0.61,
    bx: 0, // viento
    by: 398,
    aim: [
        [40, 30],
        [40, 30],
        [40, 30]
    ]
}, {
    name: "Dragon",
    file: "dragon",
    player_x: 14,
    player_y: -41,
    explodes: [Types.EXPLODE.DRAGON1, Types.EXPLODE.DRAGON2, Types.EXPLODE.DRAGONSS],
    bullets: [Types.BULLETS.DRAGON1, Types.BULLETS.DRAGON2, Types.BULLETS.DRAGONSS],
    graphics: [
        [77, 76, 32, 75]
    ],
    //falta definir
    minang: 20,
    maxang: 60,
    ax: 90,
    ay: 0.74,
    bx: 0, // viento
    by: 398,
    aim: [
        [40, 30],
        [40, 30],
        [40, 30]
    ]
}, {
    name: "Nak",
    file: "nak",
    player_x: -5,
    player_y: -26,
    explodes: [Types.EXPLODE.NAK1, Types.EXPLODE.NAK2, Types.EXPLODE.NAKSS],
    bullets: [Types.BULLETS.NAK1, Types.BULLETS.NAK2, Types.BULLETS.NAK2UG, Types.BULLETS.NAKSS],
    graphics: [
        [51, 33, 23, 30]
    ],
    minang: 110,
    maxang: 170,
    ax: 82,
    ay: 0.867,
    bx: 0, // viento
    by: 360,
    aim: [
        [130, 40],
        [130, 40],
        [130, 40]
    ]
    //{"a":82,"b":0.867,"name":"Nak","max":170,"min":110,"mobilename":"nak","aim":[[130,40],[130,40],[130,40]]}
}, {
    name: "Trico",
    file: "dino",
    player_x: -5,
    player_y: -41,
    explodes: [Types.EXPLODE.TRICO1, Types.EXPLODE.TRICO2, Types.EXPLODE.TRICOSS],
    bullets: [Types.BULLETS.TRICO1, Types.BULLETS.TRICO2, Types.BULLETS.TRICOSS],
    graphics: [
        [60, 52, 33, 51]
    ],
    minang: 10,
    maxang: 60,
    ax: 84,
    ay: 0.87,
    bx: 0, // viento
    by: 395,
    aim: [
        [58, 50],
        [58, 50],
        [58, 50]
    ]
    //{"a":83,"b":0.87,"name":"Trico","max":60,"min":10,"mobilename":"dino","aim":[[58,50],[58,50],[58,50]]}
}, {
    name: "Mage",
    file: "mage",
    player_x: 4,
    player_y: -36,
    explodes: [Types.EXPLODE.MAGE1, Types.EXPLODE.MAGE2, Types.EXPLODE.MAGESS],
    bullets: [Types.BULLETS.MAGE1, Types.BULLETS.MAGE2A, Types.BULLETS.MAGE2B, Types.BULLETS.MAGESS],
    graphics: [
        [46, 41, 25, 44]
    ],
    minang: 15,
    maxang: 50,
    ax: 71.5,
    ay: 0.78,
    bx: 0, // viento
    by: 360,
    aim: [
        [58, 50],
        [58, 50],
        [58, 50]
    ]
    //{"a":71.5,"b":0.78,"name":"Mage","max":50,"min":15,"mobilename":"mage","aim":[[58,50],[58,50],[58,50]]}
}, {
    name: "Turtle",
    file: "turtle",
    player_x: -1,
    player_y: -35,
    explodes: [Types.EXPLODE.TURTLE1, Types.EXPLODE.TURTLE2, Types.EXPLODE.TURTLESS, Types.EXPLODE.TURTLESS2],
    bullets: [Types.BULLETS.TURTLE1, Types.BULLETS.TURTLE2A, Types.BULLETS.TURTLE2B, Types.BULLETS.TURTLESS, Types.BULLETS.TURTLESS2],
    graphics: [
        [49, 48, 26, 46]
    ],
    minang: 25,
    maxang: 50,
    ax: 73.5,
    ay: 0.74,
    bx: 0, // viento
    by: 389,
    aim: [
        [54, 42],
        [54, 42],
        [54, 42]
    ]
    //{"a":73.5,"b":0.74,"name":"Turtle","max":50,"min":25,"mobilename":"turtle","aim":[[54,42],[54,42],[54,42]]}
}, {
    name: "Boomer",
    file: "boomer",
    player_x: 9,
    player_y: -25,
    explodes: [Types.EXPLODE.BOOMER12, Types.EXPLODE.BOOMER12, Types.EXPLODE.BOOMERSS],
    bullets: [Types.BULLETS.BOOMER12, Types.BULLETS.BOOMER12, Types.BULLETS.BOOMERSS],
    graphics: [
        [38, 37, 20, 35]
    ],
    minang: 10,
    maxang: 90,
    ax: 62.5,
    ay: 1.395,
    bx: 0, // viento
    by: 244,
    aim: [
        [70, 30],
        [70, 30],
        [70, 30]
    ]
    //{"a":62.5,"b":1.395,"name":"Boomer","max":90,"min":10,"mobilename":"boomer","aim":[[70,30],[70,30],[70,30]]}
}, {
    name: "Electrico",
    file: "electrico2",
    player_x: 5,
    player_y: -41,
    explodes: [Types.EXPLODE.LIGHTINING12_JD1, Types.EXPLODE.LIGHTINING12_JD1, Types.EXPLODE.TRICOSS],
    bullets: [Types.BULLETS.LIGHTNING12, Types.BULLETS.LIGHTNING12, Types.BULLETS.TRICOSS],
    graphics: [
        [89, 90, 32, 77]
    ],
    //falta definir
    minang: 25,
    maxang: 60,
    ax: 65.5,
    ay: 0.72,
    bx: 0, // viento
    by: 398,
    aim: [
        [54, 42],
        [54, 42],
        [54, 42]
    ]
}, {
    name: "Grub",
    file: "grub",
    player_x: 5,
    player_y: -33,
    explodes: [Types.EXPLODE.GRUB1, Types.EXPLODE.GRUB2, Types.EXPLODE.GRUBSS],
    bullets: [Types.BULLETS.GRUB1, Types.BULLETS.GRUB2, Types.BULLETS.GRUBSS],
    graphics: [
        [80, 72, 33, 41]
    ],
    //falta definir
    minang: 30,
    maxang: 60,
    ax: 61.0,
    ay: 0.65,
    bx: 0, // viento
    by: 398,
    aim: [
        [54, 33],
        [54, 33],
        [54, 33]
    ]
}, {
    name: "Raon L",
    file: "raon",
    player_x: 15,
    player_y: -27,
    explodes: [Types.EXPLODE.RAON1, Types.EXPLODE.RAON2, Types.EXPLODE.RAONSS, Types.EXPLODE.RAONBABY],
    bullets: [Types.BULLETS.RAON1, Types.BULLETS.RAON2, Types.BULLETS.RAONSS],
    graphics: [
        [40, 41, 21, 39]
    ],
    //falta definir
    minang: 30,
    maxang: 60,
    ax: 73.5,
    ay: 0.74,
    bx: 0, // viento
    by: 398,
    aim: [
        [54, 33],
        [54, 33],
        [54, 33]
    ]
}, {
    name: "Dragon",
    file: "drag",
    player_x: 4,
    player_y: -30,
    explodes: [Types.EXPLODE.GRUB2, Types.EXPLODE.GRUB, Types.EXPLODE.GRUBSS],
    bullets: [Types.BULLETS.GRUB1, Types.BULLETS.GRUB2, Types.BULLETS.GRUBSS],
    graphics: [
        [93, 76, 35, 70]
    ],
    //falta definir
    minang: 30,
    maxang: 60,
    ax: 73.5,
    ay: 0.74,
    bx: 0, // viento
    by: 398,
    aim: [
        [54, 33],
        [54, 33],
        [54, 33]
    ]
}, {
    name: "Kalsiddon",
    file: "kals",
    player_x: -2,
    player_y: -31,
    explodes: [Types.EXPLODE.BIGFOOT2, Types.EXPLODE.BIGFOOT2, Types.EXPLODE.BIGFOOT1SS],
    bullets: [Types.BULLETS.BIGFOOT1, Types.BULLETS.BIGFOOT2, Types.BULLETS.BIGFOOTSS],
    graphics: [
        [47, 46, 24, 41]
    ],
    //falta definir
    minang: 30,
    maxang: 60,
    ax: 88.5,
    ay: 0.74,
    bx: 0, // viento
    by: 398,
    aim: [
        [54, 33],
        [54, 33],
        [54, 33]
    ]
}];
Types.getMessageTypeAsString = function(type) {
    var typeName;
    _.each(Types.CLIENT_OPCODE, function(value, name) {
        if (value === type) {
            typeName = name;
        }
    });
    if (!typeName) {
        typeName = "UNKNOWN";
    }
    return typeName;
};
module.exports = Types;