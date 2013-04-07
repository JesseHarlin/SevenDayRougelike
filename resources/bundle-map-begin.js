(function () {




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
                    map: levelgenerator.generateRandomLevel({
                                    width: 75,
                                    height: 50,
                                    divisions: 5,
                                    minSubdivideAmt: 10,
                                    minParentWidth: 22,
                                    corners: true,
                                    pathThickness: [1, 1],
                                    porportionTolerance: 5,
                                    randomRoomSizeRandomToFixedRatio: [0.8, 0.2],
                                    porportionTriesUntilBreakSafety: 1000,
                                    
                                    wallTile: 7,
                                    floorTile: 22,
                                    voidTile: 13,


                                }),
                    playerSpawnX: 40,
                    playerSpawnY: 180,

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

                        console.log(obj, t);

                        return (t == 7);

                    }                    
                },

            
            }
        ]
    };
})()