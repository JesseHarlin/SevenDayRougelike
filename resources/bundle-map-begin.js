(function () {

    var _voidTile = 13;
    var _wallTile = 7;
    var _floorTile = 22;

    var _map = levelgenerator.generateRandomLevel({
        width: 256,
        height: 256,
        divisions: 90,
        minSubdivideAmt: 5,
        minParentWidth: 11,
        corners: false,
        pathThickness: [1, 3],
        porportionTolerance: 5,
        randomRoomSizeRandomToFixedRatio: [0.8, 0.2],
        porportionTriesUntilBreakSafety: 1000,

        wallTile: _wallTile,
        floorTile: _floorTile,
        voidTile: _voidTile,
    });

    var _startx = 0;
    var _startY = 0;
    var maplength = _map.length;

    for (var i = 0; i < maplength; i++) {
        var rowLength = _map[i].length;
        for (var j = 0; j < rowLength; j++) {
            if (_map[i][j] === _floorTile) {
                _startx = j;
                _startY = i;
                break;
            }
        }
        if (_startx !== 0 && _startY !== 0) {
            break;
        }
    }

    var pl = AkihabaraGamebox.getObject("player", "player");



    console.log(pl);

    return {
        addImage: [
            ["tiles", "resources/tiles_tiny_sample.png"]
        ],
        addTiles: [
            { id: "tiles", image: "tiles", tileh: 32, tilew: 32, tilerow: 16, gapx: 0, gapy: 0 }
        ],
        setObject: [


            {
                object: "tilemaps",
                property: "map",
                value: {
                    title: "Kariko Village",
                    tileset: "tiles",
                    map: _map,
                    playerSpawnX: _startx,
                    playerSpawnY: _startY,

                    addObjects: function() {
                        //maingame.addBlock(360, 150, "house", 0);

                    },
                    mapActions: function () {
                        
                        var pl = AkihabaraGamebox.getObject("player", "player");

                        var map_x = pl.x + pl.colx + pl.colhw || -1;
                        var map_y = pl.y + pl.coly + pl.colhh || -1;

                        var ontile = AkihabaraTile.getTileInMap(map_x, map_y, tilemaps.map, tilemaps._defaultblock, "map");

                        if (ontile == 1) {
                          //  maingame.gotoLevel({ level: "floor1", x: 580, y: 590, label: "Floor 1 entrance" });
                        }

                      


                    },
                    tileIsSolid: function (obj, t) {

                        

                        return (t == 7);

                    }                    
                },

            
            }
        ]
    };
})()