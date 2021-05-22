var cls = require('./class');
var Logger = require('./logger');
var Map = require('./map');

module.exports = MapController = cls.Class.extend({
    init: function (load) {
        var self = this;
        self.maps = {};

        if (load) {
            var nmap0 = new Map(0);
            nmap0.loadMap(function () {
                nmap0.LoadPoints();
                self.maps[0] = nmap0;
                // ' + 0);
            });
            var nmap1 = new Map(1);
            nmap1.loadMap(function () {
                nmap1.LoadPoints();
                self.maps[1] = nmap1;
                // ' + 1);
            });
            var nmap2 = new Map(2);
            nmap2.loadMap(function () {
                nmap2.LoadPoints();
                self.maps[2] = nmap2;
                // ' + 2);
            });
            var nmap3 = new Map(3);
            nmap3.loadMap(function () {
                nmap3.LoadPoints();
                self.maps[3] = nmap3;
                // ' + 3);
            });
            var nmap4 = new Map(4);
            nmap4.loadMap(function () {
                nmap4.LoadPoints();
                self.maps[4] = nmap4;
                // ' + 4);
            });
            var nmap5 = new Map(5);
            nmap5.loadMap(function () {
                nmap5.LoadPoints();
                self.maps[5] = nmap5;
                // ' + 5);
            });
            var nmap6 = new Map(6);
            nmap6.loadMap(function () {
                nmap6.LoadPoints();
                self.maps[6] = nmap6;
                // ' + 6);
            });
            var nmap7 = new Map(7);
            nmap7.loadMap(function () {
                nmap7.LoadPoints();
                self.maps[7] = nmap7;
                // ' + 7);
            });
            var nmap8 = new Map(8);
            nmap8.loadMap(function () {
                nmap8.LoadPoints();
                self.maps[8] = nmap8;
                // ' + 8);
            });
            var nmap9 = new Map(9);
            nmap9.loadMap(function () {
                nmap9.LoadPoints();
                self.maps[9] = nmap9;
                // ' + 9);
            });
            var nmap10 = new Map(10);
            nmap10.loadMap(function () {
                nmap10.LoadPoints();
                self.maps[10] = nmap10;
                // ' + 10);
            });
            var nmap11 = new Map(11);
            nmap11.loadMap(function () {
                nmap11.LoadPoints();
                self.maps[11] = nmap11;
                // ' + 11);
            });
            var nmap12 = new Map(12);
            nmap12.loadMap(function () {
                nmap12.LoadPoints();
                self.maps[12] = nmap12;
                // ' + 12);
            });
            var nmap13 = new Map(13);
            nmap13.loadMap(function () {
                nmap13.LoadPoints();
                self.maps[13] = nmap13;
                // ' + 13);
            });
            var nmap14 = new Map(14);
            nmap14.loadMap(function () {
                nmap14.LoadPoints();
                self.maps[14] = nmap14;
                // ' + 14);
            });
            var nmap15 = new Map(15);
            nmap15.loadMap(function () {
                nmap15.LoadPoints();
                self.maps[15] = nmap15;
                // ' + 15);
            });
            var nmap16 = new Map(16);
            nmap16.loadMap(function () {
                nmap16.LoadPoints();
                self.maps[16] = nmap16;
                // ' + 16);
            });
            var nmap17 = new Map(17);
            nmap17.loadMap(function () {
                nmap17.LoadPoints();
                self.maps[17] = nmap17;
                // ' + 17);
            });
            var nmap18 = new Map(18);
            nmap18.loadMap(function () {
                nmap18.LoadPoints();
                self.maps[18] = nmap18;
                // ' + 18);
            });
            var nmap19 = new Map(19);
            nmap19.loadMap(function () {
                nmap19.LoadPoints();
                self.maps[19] = nmap19;
                // ' + 19);
            });
            var nmap20 = new Map(20);
            nmap20.loadMap(function () {
                nmap20.LoadPoints();
                self.maps[20] = nmap20;
                // ' + 20);
            });
            var nmap21 = new Map(21);
            nmap21.loadMap(function () {
                nmap21.LoadPoints();
                self.maps[21] = nmap21;
                // ' + 21);
            });
            var nmap22 = new Map(22);
            nmap22.loadMap(function () {
                nmap22.LoadPoints();
                self.maps[22] = nmap22;
                // ' + 22);
            });
            var nmap23 = new Map(23);
            nmap23.loadMap(function () {
                nmap23.LoadPoints();
                self.maps[23] = nmap23;
                // ' + 23);
            });
            var nmap24 = new Map(24);
            nmap24.loadMap(function () {
                nmap24.LoadPoints();
                self.maps[24] = nmap24;
                // ' + 24);
            });
            var nmap25 = new Map(25);
            nmap25.loadMap(function () {
                nmap25.LoadPoints();
                self.maps[25] = nmap25;
                // ' + 25);
            });
            var nmap26 = new Map(26);
            nmap26.loadMap(function () {
                nmap26.LoadPoints();
                self.maps[26] = nmap26;
                // ' + 26);
            });
            var nmap27 = new Map(27);
            nmap27.loadMap(function () {
                nmap27.LoadPoints();
                self.maps[27] = nmap27;
                // ' + 27);
            });
            var nmap28 = new Map(28);
            nmap28.loadMap(function () {
                nmap28.LoadPoints();
                self.maps[28] = nmap28;
                // ' + 28);
            });
            var nmap29 = new Map(29);
            nmap29.loadMap(function () {
                nmap29.LoadPoints();
                self.maps[29] = nmap29;
                // ' + 29);
            });
            var nmap30 = new Map(30);
            nmap30.loadMap(function () {
                nmap30.LoadPoints();
                self.maps[30] = nmap30;
                // ' + 30);
            });
            var nmap31 = new Map(31);
            nmap31.loadMap(function () {
                nmap31.LoadPoints();
                self.maps[31] = nmap31;
                // ' + 31);
            });
            var nmap32 = new Map(32);
            nmap32.loadMap(function () {
                nmap32.LoadPoints();
                self.maps[32] = nmap32;
                // ' + 32);
            });
            var nmap33 = new Map(33);
            nmap33.loadMap(function () {
                nmap33.LoadPoints();
                self.maps[33] = nmap33;
                // ' + 33);
            });
            var nmap34 = new Map(34);
            nmap34.loadMap(function () {
                nmap34.LoadPoints();
                self.maps[34] = nmap34;
                // ' + 34);
            });
            var nmap35 = new Map(35);
            nmap35.loadMap(function () {
                nmap35.LoadPoints();
                self.maps[35] = nmap35;
                // ' + 35);
            });
            var nmap36 = new Map(36);
            nmap36.loadMap(function () {
                nmap36.LoadPoints();
                self.maps[36] = nmap36;
                // ' + 36);
            });
            var nmap37 = new Map(37);
            nmap37.loadMap(function () {
                nmap37.LoadPoints();
                self.maps[37] = nmap37;
                // ' + 37);
            });
            var nmap38 = new Map(38);
            nmap38.loadMap(function () {
                nmap38.LoadPoints();
                self.maps[38] = nmap38;
                // ' + 38);
            });
            var nmap39 = new Map(39);
            nmap39.loadMap(function () {
                nmap39.LoadPoints();
                self.maps[39] = nmap39;
                // ' + 39);
            });
            var nmap40 = new Map(40);
            nmap40.loadMap(function () {
                nmap40.LoadPoints();
                self.maps[40] = nmap40;
                // ' + 40);
            });
            var nmap41 = new Map(41);
            nmap41.loadMap(function () {
                nmap41.LoadPoints();
                self.maps[41] = nmap41;
                // ' + 41);
            });
            var nmap42 = new Map(42);
            nmap42.loadMap(function () {
                nmap42.LoadPoints();
                self.maps[42] = nmap42;
                // ' + 42);
            });
            var nmap43 = new Map(43);
            nmap43.loadMap(function () {
                nmap43.LoadPoints();
                self.maps[43] = nmap43;
                // ' + 43);
            });
        }
    },

    arrayClone: function (arr) {
        var nm = [];
        for (var i = 0; i < arr.length; i++) {
            nm[i] = arr[i];
        }
        return nm;
    },

    getMap: function (id) {
        var self = this;
        try {
            if (self.maps[id]) {
                var basem = this.maps[id];
                var nmap = new Map(id);
                nmap.data = self.arrayClone(basem.data);
                nmap.w = basem.w;
                nmap.h = basem.h;
                nmap.points = self.arrayClone(basem.points);
                return nmap;
            }
        } catch (e) {
            Logger.error('err: ' + e.stack);
            return null;
        }
    }
});
