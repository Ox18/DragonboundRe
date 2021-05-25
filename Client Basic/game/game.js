var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Message = require('./lib/message');
var World = require('./world');
var Shoot = require('./lib/shoot');
const ThorSatellite = require('./Entity/ThorSatellite');
const Helper = require('./Utilities/Helper');
const TeleportProjectile = require('./GameComponents/Projectile/TeleportProjectile');
const ProjectileHandler = require('./GameComponents/Projectile/Projectile');

module.exports = class Game {
    constructor(id, room, gameserver) {
        var self = this;
        this.id = id;
        this.room = room;
        this.gameserver = gameserver;
        this.wind_power = 0;
        this.wind_angle = 60;
        this.frist_turn = 0;
        this.time_played = 0;
        this.turn_player = 0;
        this.weather = [0, 0, 0, 0, 0];
        this.gameEnd_callback = null;
        this.thor = new ThorSatellite();
        this.map = self.gameserver.mapControl.getMap(room.map);
        this.world = new World(self, self.gameserver);
        this.world.onShootComplete(function (acc, shoot, chat) {
            try {
                self.getNextTurn(function (player) {
                    self.turn_player = player.position;
                    if (typeof (player.position) !== 'undefined') {
                        self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player, chat));
                        if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                            self.room.forBots(function (bot) {
                                if (bot.player.position === self.turn_player) {
                                    bot.turn();
                                }
                            });
                        }
                        self.checkDead();
                    } else {
                        self.getNextTurn(function (player2) {
                            self.turn_player = player2.position;
                            if (typeof (player2.position) !== 'undefined') {
                                self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player2, chat));
                                if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                                    self.room.forBots(function (bot) {
                                        if (bot.player.position === self.turn_player) {
                                            bot.turn();
                                        }
                                    });
                                }
                                self.checkDead();
                            }
                        });
                    }
                });
            } catch (e) {
                self.getNextTurn(function (player) {
                    self.turn_player = player.position;
                    self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player, chat));
                    if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                        self.room.forBots(function (bot) {
                            if (bot.player.position === self.turn_player) {
                                bot.turn();
                            }
                        });
                    }
                    self.checkDead();
                });
            }

        });
    }

    start(callback) {
        var self = this;
        self.room.status = Types.ROOM_STATUS.PLAYING;
        self.room.forPlayers(function (account) {
            if (account !== null) {
                let player = account.player;
                var point = self.map.GetPoint();
                player.x = point.x;
                player.y = point.y;
                player.reloadHp();
            }
        });
        callback();

    }

    checkDead() {
        var self = this;
        var team_a_alive = 0;
        var team_b_alive = 0;
        var end = false;
        self.room.forPlayers(function (account) {
            let player = account.player;
            if (player.is_alive === 1) {
                if (player.team == 1) {
                    team_a_alive++;
                } else {
                    team_b_alive++;
                }
            }
        });
        if (team_a_alive === 0) {
            //enviar win team a
            self.gameserver.pushToRoom(self.room.id, new Message.gameOver(self.room, 0));
            Logger.log("win: team b");
            end = true;
            self.gameEnd_callback(0);
        } else if (team_b_alive === 0) {
            //enviar win team b
            self.gameserver.pushToRoom(self.room.id, new Message.gameOver(self.room, 1));
            Logger.log("win: team a");
            end = true;
            self.gameEnd_callback(1);
        }
        if (end) {
            self.world = null;
            self.map = null;
        }
    }

    gameShoot(x, y, body, look, ang, power, time, type, account, GameShoot) {
        var self = this;
        const wind = {
            power: self.wind_power,
            angle: self.wind_angle
        };
        const { MOBILES } = Types;
        const { player } = account;
        const { mobile } = player;
        const mobile_data = MOBILES[mobile];
        
        GameShoot.UpdateLigth(wind, mobile_data);

        const dataDelay = [100, 150, 250];
        account.player.addDelay(dataDelay[type] || 0);

        const { ProjectileName } = GameShoot;
        var dataShot = GameShoot.item.isTeleport ? TeleportProjectile.Get() : [...armorProjectile[ProjectileName.first]()];
        
        if(GameShoot.isItem && GameShoot.ItemMethod){
            dataShot = [...dataShot, ...armorProjectile[ProjectileName.second](1000)];
            account.player.CleanItemUse();
        }
        let n_shot = 0;
        dataShot.map((shot) => {
            this.world.shoots[n_shot] = new Shoot(GameShoot.final.x, GameShoot.final.y, GameShoot.angle, GameShoot.power, GameShoot.type, GameShoot.ligth.ax, GameShoot.ligth.ay, wind.angle, wind.power, GameShoot.account);
            Object.entries(shot.data).map(a => this.world.shoots[n_shot][a[0]] = a[1]);
            Object.entries(shot.type).map(a => this.world.shoots[n_shot].type[a[0]] = a[1]);
            n_shot++;
        });
        this.world.shoot();
        this.world.shoots_count = n_shot;

        this.world.run();
        this.PushWeather();
    }
    
    getNextTurn(callback) {
        var self = this;
        var list_turn = [];
        var xf = 0;
        this.room.forPlayers(function (account) {
            if (typeof (account) !== 'undefined') {
                var player = account.player;
                if (account !== null && player.is_alive === 1) {
                    list_turn.push({
                        user_id: player.user_id,
                        team: player.team,
                        delay: player.delay,
                        lastturn: player.lastturn,
                        position: player.position
                    });
                    xf++;
                }
            }
        });

        if (xf <= 0)
            self.checkDead();

        list_turn.sort(function (a, b) {
            return a.delay == b.delay ? a.lastturn - b.lastturn : a.delay - b.delay;
        });
        callback(list_turn[0] !== null ? list_turn[0] : list_turn[1]);
    }

    gamePass(account) {
        var self = this;
        self.getNextTurn(function (player) {
            if (typeof (account) !== 'undefined') {
                if (account.player !== null)
                    account.player.addDelay(100);
            } else {
                account = null;
            }
            if (typeof (player) !== 'undefined') {
                self.turn_player = player.position;
                if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                    self.room.forBots(function (bot) {
                        if (bot.player.position === self.turn_player) {
                            bot.turn();
                        }
                    });
                }
                self.gameserver.pushToRoom(self.room.id, new Message.gamePass(account, player, self.room));
            } else { }
        });
        self.PushWeather();
    }
    PushWeather() {
        const nextWeather = Helper.random(-1, 1);
        this.weather.shift();
        this.weather.push(nextWeather);
    }
    onGameEnd(callback) {
        this.gameEnd_callback = callback;
    }
};