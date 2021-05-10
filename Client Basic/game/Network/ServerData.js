const ServerData = [
    {
        ID: 0,
        MaxPlayers: 200,
        Version: 86,
        Name: "Normal",
        Server_type: 0,
        EventGP: false,
        LobbyText: {
            message: "Welcome to server 1",
            type: 9
        },
        Tournament: {
            Start_time: Date.now(),
            End_time: Date.now(),
            Players: null,
            Avatar_on: 0,
            Max_wind: 0,
            Force_mobile: 2,
            Name: "",
            Total_games: "",
            Last_5_minutes_games: "",
            Rooms: "",
            Maps: [],
            Game_mode: 0,
            S1: 0,
            Tp: 0,
            Save_personal: 0,
            Save_guild: 0,
            Min_points: 0,
            Different_mobiles: 0,
            Gifts: [],
            Gp_event: 200
        }
    }
];

module.exports = ServerData;