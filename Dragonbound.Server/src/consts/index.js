export * from "./server_type"

export const CHAT = Object.freeze({
    TYPE: {
        NORMAL: 0
        , DEAD: 2
        , GOLD: 3
        , POWER_USER: 4
        , GM: 5
        , SYSTEM: 6
        , BUGLE: 7
        , LOSE_LIFE: 8
        , GM_BUGLE: 9
        , NORMAL_TEAM: 10
        , POWER_USER_TEAM: 11
        , LOVE: 12
        , BREAK_UP: 13
        , AUDIO: 14
        , AUDIO_PU: 15
        , AUDIO_GM: 16
        , BOT: 17
    },
    LENGTH_LIMIT: 150,
    GROUP: {
        ENGLISH: 0,
        GLOBAL: 1,
        BROADCAST: 7,
        EVENTS: 6,
        CHANNEL_1: 2,
        CHANNEL_2: 3,
        CHANNEL_3: 4,
        CHANNEL_4: 5,
    }
})

export const LOCATION = Object.freeze({
    CHANNEL: 1
    , ROOM: 2
    , GAME: 3
    , SHOP: 4
})