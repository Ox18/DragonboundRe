var Types = require('./gametypes');
var Logger = require('./lib/logger');
var Message = require('./lib/message');
var World = require('./world');
var Shoot = require('./lib/shoot');
const ThorSatellite = require('./Entity/ThorSatellite');
const Map = require('./Entity/Map');
const Helper = require('./Utilities/Helper');
const Mobiles = require('./Entity/Mobiles');
const teleportProjectile = require('./GameComponents/Projectile/TeleportProjectile');

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
        this.world.onShootComplete(function(acc, shoot, chat) {
            try {
                self.getNextTurn(function(player) {
                    self.turn_player = player.position;
                    if (typeof(player.position) !== 'undefined') {
                        self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player, chat));
                        if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                            self.room.forBots(function(bot) {
                                if (bot.player.position === self.turn_player) {
                                    bot.turn();
                                }
                            });
                        }
                        self.checkDead();
                    } else {
                        self.getNextTurn(function(player2) {
                            self.turn_player = player2.position;
                            if (typeof(player2.position) !== 'undefined') {
                                self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player2, chat));
                                if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                                    self.room.forBots(function(bot) {
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
                self.getNextTurn(function(player) {
                    self.turn_player = player.position;
                    self.gameserver.pushToRoom(self.room.id, new Message.gamePlay(acc, shoot, player, chat));
                    if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                        self.room.forBots(function(bot) {
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
        self.room.forPlayers(function(account) {
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
        self.room.forPlayers(function(account) {
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

    gameShoot(x, y, body, look, ang, power, time, type, account) {
        var self = this;
        const { mobile, itemInUse } = account.player;
        const mobile_info = Mobiles.FindDataMobile(mobile);
        const isTeleport = itemInUse === 1;
        const isDual = itemInUse === 0;
        const isDualPlus = itemInUse === 2;
        const method_bullet = ['getS1', 'getS2', 'getSS'];

        let bullet = {
            isS1: type === 0,
            isS2: type === 1,
            isSS: type === 2,
        };
        bullet.data = isTeleport ? teleportProjectile.Get() : mobile_info.projectile[method_bullet[type]]();
        if (isDual || isDualPlus) {
            const method_name = isDual ? method_bullet[type] : isDualPlus ? method_bullet[type === 0 ? 1 : 0] : null;
            bullet.data.push(...mobile_info.projectile[method_name](1000));
        }
        if (isDual || isDualPlus || isTeleport) account.player.CleanItemUse();
        power = parseInt(power * 234 / 100);
        var mobile_data = Types.MOBILES[account.player.mobile];

        var b0 = Math.round(parseInt(Math.cos(self.wind_angle * Math.PI / 180) * self.wind_power * mobile_data.by)) / 100;
        var b1 = Math.round(parseInt(Math.sin(self.wind_angle * Math.PI / 180) * self.wind_power * mobile_data.by - mobile_data.bx)) / 100;
        var ax = Math.round(0 - b0);
        var ay = Math.round(mobile_data.by - b1);
        if (self.wind_power === 0) {
            ax = 0;
            ay = mobile_data.by;
        }

        var dis = 0;
        if (look === 0) {
            ang = 180 - ang;
            if (account.player.mobile === Types.MOBILE.ADUKA) {
                dis = 26;
            } else {
                dis = -11;
            }
        } else {
            if (account.player.mobile === Types.MOBILE.ADUKA) {
                dis = -26;
            } else {
                dis = 11;
            }
        }
        ang -= body;
        var point = {
            x: x + dis,
            y: account.player.mobil === Types.MOBILE.ADUKA ? y - 31 : y - 28
        };
        var pfinal = Helper.RotatePoint(point, { x, y }, body);


        if (type === 0) {
            account.player.addDelay(100);
        } else if (type == 1) {
            account.player.addDelay(150);
        } else if (type == 2) {
            account.player.addDelay(250);
        }
        let n_shot = 0;
        bullet.data.map((shot) => {
            const current = shot.currentData;
            const shot_ang = ang + (current.ang ? current.ang : 0);
            const shot_power = power + (current.power ? current.power : 0);
            this.world.shoots[n_shot] = new Shoot(pfinal.x, pfinal.y, shot_ang, shot_power, type, ax, ay, this.wind_angle, this.wind_power, account);
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
        this.room.forPlayers(function(account) {
            if (typeof(account) !== 'undefined') {
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

        list_turn.sort(function(a, b) {
            return a.delay == b.delay ? a.lastturn - b.lastturn : a.delay - b.delay;
        });
        callback(list_turn[0] !== null ? list_turn[0] : list_turn[1]);
    }

    gamePass(account) {
        var self = this;
        self.getNextTurn(function(player) {
            if (typeof(account) !== 'undefined') {
                if (account.player !== null)
                    account.player.addDelay(100);
            } else {
                account = null;
            }
            if (typeof(player) !== 'undefined') {
                self.turn_player = player.position;
                if (self.room.game_mode === Types.GAME_MODE.BOSS) {
                    self.room.forBots(function(bot) {
                        if (bot.player.position === self.turn_player) {
                            bot.turn();
                        }
                    });
                }
                self.gameserver.pushToRoom(self.room.id, new Message.gamePass(account, player, self.room));
            } else {}
        });
        self.PushWeather();
    }
    PushWeather() {
        const nextWeather = Helper.random(-1, 1);
        this.weather.shift();
        this.weather.push(nextWeather);
        this.UpdateWeather();
    }
    UpdateWeather() {
        this.thor.Fetch();
    }
    onGameEnd(callback) {
        this.gameEnd_callback = callback;
    }
};