var cls = require('./class');
var Logger = require('./logger');
var Map = require('./map');
module.exports = MapController = cls.Class.extend({
    init: function (load) {
        var self = this;
        self.maps = {};
        if (load) {
            let mapID = 0;
            let mapCount = 44;
            for(mapID; mapID < mapCount; mapID++){
                let map = new Map(mapID);
                map.loadMap(function(){
                    map.LoadPoints();
                    self.maps[mapID] = map;
                });
            }
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