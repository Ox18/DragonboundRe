const ServerTypes = require("../../types/ServerTypes");
const ChatTypes = require('../../types/ChatTypes');

const defaultMessage = {
    message: '',
    player_name: '',
    type: ChatTypes.TYPE.BUGLE
}
const welcomeMessage = {
    message: 'Welcome to SocialBound',
    player_name: '',
    type: ChatTypes.TYPE.BUGLE
}

module.exports = {
    version: 86,
    time: 0, // ?? 
    time_lapsed: 0, // ??
    servers: [
        {
            id              : 1,
            name            : "High Ranks",
            type            : ServerTypes.SERVER_NORMAL,
            port            : 9001,
            playerOnline    : 0,
            playerLimit     : 1000,
            isRestricted    : true,
            minRank         : 9,
            maxRank         : 24,
            chat            : [{...welcomeMessage}]
            
        },
        {
            id              : 2,
            name            : "Mid Ranks",
            type            : ServerTypes.SERVER_NORMAL,
            port            : 9002,
            playerOnline    : 0,
            playerLimit     : 1000,
            isRestricted    : true,
            minRank         : 7,
            maxRank         : 17,
            chat            : [{...welcomeMessage}]
        },
        {
            id              : 3,
            name            : "Beginners",
            type            : ServerTypes.SERVER_NORMAL,
            port            : 9003,
            playerOnline    : 0,
            playerLimit     : 1000,
            isRestricted    : true,
            minRank         : 0,
            maxRank         : 6,
            chat            : [
                {...welcomeMessage},
                { ...defaultMessage },
                {
                    message: 'I am a second welcome message',
                    player_name: '',
                    type: ChatTypes.TYPE.BUGLE
                },
                {
                    message: 'Hello all, I am the message of a gm programmed from a fictitious database.',
                    player_name: 'Alex',
                    type: ChatTypes.TYPE.GM
                }
            ]
        },
    ]
};
