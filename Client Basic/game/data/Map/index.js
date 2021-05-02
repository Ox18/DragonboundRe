const Helper = require("../../../Utilities/Helper");

class MapData{
    constructor(ID, Name, SpawnPoints, w, h, ground_size, offset_x, offset_y){
        this.ID = ID;
        this.Name = Name;
        this.SpawnPoints = SpawnPoints;
        this.w = w;
        this.h = h;
        this.ground_size = ground_size;
        this.offset_x = offset_x;
        this.offset_y = offset_y;
    }
};

module.export = class Map{
    MapList(){
        return [
        new MapData(0, 'Dragon Lava', [], 1766, 456, 1800, 17, 1344),
        new MapData(1, 'Space', [], 1600, 310, 1600, 0, 1067),
        new MapData(2, 'Metropolis', [], 1800, 715, 1800, 0, 1085),
        new MapData(3, 'Sea Of Hero', [], 1600, 629, 1600, 0, 688),
        new MapData(4, 'Lion Jungle', [], 1800, 372, 1800, 0, 788),
        new MapData(5, 'Dragon', [], 2000, 461, 2000, 0, 1539),
        new MapData(6, 'Bridge', [], 1649, 396, 1800, 80, 1384),
        new MapData(7, 'Dummy Slope', [], 1429, 391, 1600, 76, 1037),
        new MapData(8, 'Thousand Sunny', [], 1345, 425, 1800, 231, 922),
        new MapData(9, 'Mayan', [], 1409, 760, 1800, 196, 1020),
        new MapData(10, 'Cave', [], 1545, 697, 1800, 133, 1103),
        new MapData(11, 'Secret', [], 1800, 886, 1800, 0, 914),
        new MapData(12, 'Ice Cave', [], 2000, 1334, 2000, 0, 0),
        new MapData(13, 'Tree of Life', [], 1598, 630, 1800, 101, 700),
        new MapData(14, 'Ice Fish', [], 1534, 453, 1800, 133, 673),
        new MapData(15, 'Mundial', [], 1453, 814, 1800, 173, 493),
        new MapData(16, 'Candy', [], 1545, 804, 1800, 127, 996),
        new MapData(17, 'Monster', [], 1449, 876, 1449, 0, 286),
        new MapData(18, 'Miramo Town B', [], 1376, 328, 1800, 222, 1472),
        new MapData(19, 'Nirvana B', [], 814, 836, 1600, 435, 741),
        new MapData(20, 'Metropolis B', [], 1298, 499, 1800, 232, 1040),
        new MapData(21, 'Sea of Hero B', [], 1518, 329, 1600, 36, 955),
        new MapData(22, 'Adium Root B', [], 1599, 425, 1800, 101, 1289),
        new MapData(23, 'Dragon B', [], 1800, 721, 1800, 0, 590),
        new MapData(24, 'Cozy Tower B', [], 1558, 567, 1800, 121, 1233),
        new MapData(25, 'Dummy Slope B', [], 1275, 364, 1800, 278, 1126),
        new MapData(26, 'Start Dust B', [], 1707, 468, 1800, 40, 1332),
        new MapData(27, 'Meta Mine B', [], 1800, 904, 1800, 0, 753),
        new MapData(28, 'Love You', [], 1298, 1043, 1800, 251, 757),
        new MapData(29, 'Love You B', [], 1226, 836, 1800, 284, 964),
        new MapData(30, 'Lond', [], 1280, 708, 1800, 260, 856),
        new MapData(31, 'Lond B', [], 1374, 1000, 1800, 202, 883),
        new MapData(32, 'Desert', [], 1800, 550, 1800, 0, 1250),
        new MapData(33, 'Desert B', [], 1759, 1394, 1800, 23, 406),
        new MapData(34, 'Gray City', [], 1755, 680, 1800, 22, 1120),
        new MapData(35, 'Gray City B', [], 1800, 1051, 1800, 0, 749),
        new MapData(36, 'Jungle', [], 1800, 621, 1800, 0, 1179),
        new MapData(37, 'Jungle B', [], 1768, 925, 1800, 10, 852),
        new MapData(38, 'My Room', [], 1725, 1100, 1800, 38, 604),
        new MapData(39, 'My Room B', [], 1598, 878, 1800, 105, 922),
        new MapData(40, 'Dummy Slope C', [], 1303, 317, 1600, 144, 948),
        new MapData(41, 'Audim Root C', [], 339, 1054, 1800, 751, 746),
        new MapData(42, 'MegaMine', [], 1798, 818, 2000, 202, 1100),
        new MapData(43, 'MiniMine', [], 1127, 810, 1250, 110, 400),
        ];
    }
    GetMap(mapID){
        return this.MapList().filter( map => map.ID === mapID);
    }
    GetRandomMap(){
        let max = this.MapList().length - 1;
        return this.MapList()[Helper.random(0, max)];
    }
};
