const ServerTypes = require("../../types/ServerTypes");

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
            maxRank         : 24
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
            maxRank         : 17
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
            maxRank         : 6
        },
    ]
};