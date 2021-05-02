var _ = require('underscore');
var cls = require('./class');
var Types = require('../gametypes');
var Logger = require('./logger');
var Map = require('./map');

module.exports = MapController = cls.Class.extend({
    init: function (load) {
        var self = this;
        self.maps = {};

        if (load) {
            var nmap = new Map(0);
            nmap.loadMap(function () {
                nmap.LoadPoints();
                self.maps[0] = nmap;
                Logger.debug('MapLoad: ' + 0);
            });

            var nmap1 = new Map(1);
            nmap1.loadMap(function () {
                nmap1.LoadPoints();
                self.maps[1] = nmap1;
                Logger.debug("MapLoad: " + 1);
            });

            var nmap3 = new Map(3);
            nmap3.loadMap(function () {
                nmap3.LoadPoints();
                self.maps[3] = nmap3;
                Logger.debug("MapLoad: " + 3);
            });

            var nmap4 = new Map(4);
            nmap4.loadMap(function () {
                nmap4.LoadPoints();
                self.maps[4] = nmap4;
                Logger.debug("MapLoad: " + 4);
            });

            var nmap5 = new Map(5);
            nmap5.loadMap(function () {
                nmap5.LoadPoints();
                self.maps[5] = nmap5;
                Logger.debug("MapLoad: " + 5);
            });

            var nmap6 = new Map(6);
            nmap6.loadMap(function () {
                nmap6.LoadPoints();
                self.maps[6] = nmap6;
                Logger.debug("MapLoad: " + 6);
            });

            /*var nmap7 = new Map(7);
            nmap7.loadMap(function() {
                nmap7.LoadPoints();
                self.maps[7] = nmap7;
                Logger.debug("MapLoad: " + 7);
            });*/

            /*var nmap8 = new Map(8);
            nmap8.loadMap(function() {
                nmap8.LoadPoints();
                self.maps[8] = nmap8;
                Logger.debug("MapLoad: " + 8);
            });*/

            var nmap9 = new Map(9);
            nmap9.loadMap(function () {
                nmap9.LoadPoints();
                self.maps[9] = nmap9;
                Logger.debug("MapLoad: " + 9);
            });

            var nmap10 = new Map(10);
            nmap10.loadMap(function () {
                nmap10.LoadPoints();
                self.maps[10] = nmap10;
                Logger.debug("MapLoad: " + 10);
            });

            var nmap14 = new Map(14);
            nmap14.loadMap(function () {
                nmap14.LoadPoints();
                self.maps[14] = nmap14;
                Logger.debug("MapLoad: " + 14);
            });

            /*var nmap15 = new Map(15);
            nmap15.loadMap(function() {
                nmap15.LoadPoints();
                self.maps[15] = nmap15;
                Logger.debug("MapLoad: " + 15);
            });*/

            /*var nmap32 = new Map(32);
            nmap32.loadMap(function() {
                nmap32.LoadPoints();
                self.maps[32] = nmap32;
                Logger.debug("MapLoad: " + 32);
            });*/
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