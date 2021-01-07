var config = {
    game: {
      name: "DragonBound"
    },
    database:{
      host: "localhost",
      database: "game",
      user: "root",
      password: "wilmerdelgado",
      port: 3306
    },
    autorank: {
      time: 5 * 60 * 1000,
      rank: [
        -1000000,
        1100,
        1200,
        1500,
        1800,
        2300,
        2800,
        3500,
        4200,
        5100,
        6000,
        6900,
        8243,
        9981,
        12264,
        15468,
        20522,
        27653,
        38842,
        52356,
        80315,
        95011,
        557876],
        limiTop: 557874,
    }

  };
module.exports = config;