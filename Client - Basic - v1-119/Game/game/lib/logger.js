var fs = require('fs');

const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m" //القرمزي
    },
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
        Crimson: "\x1b[48m"
    }
};
var logFile = fs.createWriteStream("default.txt", { flags: 'a' });

var Logger = {};
Logger.Init = function(str) {
    logFile = fs.createWriteStream(str, { flags: 'a' });
};

Logger.log = function(str) {
    this.write(0, str);
};

Logger.normal = function(str) {
    this.write(1, str);
};

Logger.info = function(str) {
    this.write(2, str);
};

Logger.debug = function(str) {
    this.write(3, str);
};

Logger.error = function(str) {
    this.write(4, str);
};

Logger.sql = function(str) {
    logFile.write(str.sql + '\n');
};

Logger.write = function(type, str) {
    if (type === 0) {
        console.log(colors.fg.Green, '[ LOG    ]: ' + str, colors.Reset);
        logFile.write('[ LOG    ]: ' + str + '\n');
    } else if (type == 1) {
        console.log(colors.fg.Green, '[ NORMAL ]: ' + str, colors.Reset);
    } else if (type == 2) {
        console.log(colors.fg.Yellow, '[ INFO   ]: ' + str, colors.Reset);
    } else if (type == 3) {
        console.log(colors.fg.Red, '[ DEBUG  ]: ' + str, colors.Reset);
    } else {
        console.log(colors.fg.Red, '[ ERROR  ]: ' + str, colors.Reset);
    }
};

module.exports = Logger;