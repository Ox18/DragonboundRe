var Types = require('./gametypes');
var _ = require('underscore');
var Message = require('./lib/message');
var Logger = require('./lib/logger');

// commands
module.exports = class Commands {
    constructor(account) {
        this.account = account;
        this.gameserver = account.gameserver;
    }


    parse(msj) {
        var self = this;
        var data;
        try {
            data = this.cmdargs(msj);
            switch (data[0]) {
                case '/bcm':
                    {
                        if (data[1] !== null && data[1].length > 0) {
                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, data[1], Types.CHAT_TYPE.GM_BUGLE));
                        }
                        break;
                    }
                case '/sys':
                    {
                        if (data[1] !== null && data[1].length > 0) {
                            self.gameserver.pushBroadcast(new Message.chatResponse(self.account, data[1], Types.CHAT_TYPE.SYSTEM));
                        }
                        break;
                    }
                case '/clear':
                    {
                        if (self.account.player.gm === 1) {
                            self.gameserver.chathistory = [];
                        }
                        break;
                    }
                case '/on4':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 8;
                            self.account.room.power = 1;
                        }
                        break;
                    }
                case '/on2':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            self.account.room.max_players = 4;
                            self.account.room.power = 1;
                        }
                        break;
                    }
                case '/bug':
                    {
                        if (self.account.player.gm === 1 && typeof (self.account.room) !== 'undefined') {
                            if (typeof (self.account.room.game) !== 'undefined') {
                                self.account.room.game.gamePass(null);
                            }
                        }
                        break;
                    }
            }
        } catch (e) {
            
        }
    }

    cmdargs(str) {
        var args = [];
        var nred = false;
        var part = '';
        for (var i = 0; i < str.length + 1; i++) {
            if (str.charAt(i) === " " && nred === false || i === str.length) {
                args.push(part);
                part = '';
            } else {
                if (str.charAt(i) === '\"') {
                    nred = !nred;
                } else {
                    part += str.charAt(i);
                }
            }
        }
        return args;
    }
};