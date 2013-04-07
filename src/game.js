var audioserver;
var maingame;
var noface; // Is a fake "actor" in dialogues. The text is ever in the same place.
var tilemaps = {}, dialogues = {}, credits = {};


function objectIsAlive(th) {
    return AkihabaraTrigo.getDistance(th, AkihabaraGamebox.getCamera()) < 800;
}


function go() {
    AkihabaraGamebox.setGroups(["background", "player", "walls", "foreground", "gamecycle"]);


    AkihabaraGamebox.setRenderOrder(["background", AkihabaraGamebox.ZINDEX_LAYER, "foreground", "gamecycle"]);

    maingame = AkihabaraGamecycle.createMaingame("gamecycle", "gamecycle");
    
    maingame.gameTitleIntroAnimation = function (reset) {
        
        //if (reset) {
        //    AkihabaraToys.resetToy(this, "rising");
        //} else {
        //    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), { alpha: 1, color: "rgb(45,45,45)" });

        //    AkihabaraToys.logos.rising(this, "rising", {
        //        image: "logo",
        //        x: AkihabaraGamebox.getScreenHW() - AkihabaraGamebox.getImage("logo").hwidth,
        //        y: 20,
        //        speed: 1,
        //        gapx: 250,
        //        reflex: 0.1
        //    });
        //}

        return true;
    };
    
    maingame.gameIntroAnimation = function(reset) {
         return true;
    }; 
    
    maingame.endlevelIntroAnimation = function() {
         return true;
    };


    maingame.levelIntroAnimation = function(reset) {
        if (reset) {
            AkihabaraToys.resetToy(this, "default-blinker");
        } else {
            AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), { alpha: 1 });
            return AkihabaraToys.text.fixed(this, "default-blinker", AkihabaraGamebox.getBufferContext(), { font: "big", text: maingame.getNextLevel().label, valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), time: 50 });
        }
    };

    maingame.gameIsOver = function() { return true; };

    //changing default phrase to now read "PRESS Z TO START"
    maingame.pressStartIntroAnimation = function(reset) {
        //if (reset) {
        //    AkihabaraToys.resetToy(this, "default-blinker");
        //} else {
        //    AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {
        //        font: "smallgreyfont",
        //        text: "PRESS Z TO START",
        //        valign: AkihabaraGamebox.ALIGN_MIDDLE,
        //        halign: AkihabaraGamebox.ALIGN_CENTER,
        //        dx: 0,
        //        dy: Math.floor(AkihabaraGamebox.getScreenH() / 3),
        //        dw: AkihabaraGamebox.getScreenW(),
        //        dh: Math.floor(AkihabaraGamebox.getScreenH() / 3) * 2,
        //        blinkspeed: 10
        //    });
        //    return AkihabaraInput.keyIsHit("a");
        //}
        return true;
    };


    var counter = 0;
    // Game events are decided by the map.
    maingame.gameEvents = function () {

        tilemaps.map.mapActions();
    };


    // Change level
    maingame.changeLevel = function(level) {
        

        //garbage disposal
        AkihabaraGamebox.trashGroup("playerbullets");
        AkihabaraGamebox.trashGroup("foesbullets");
        AkihabaraGamebox.trashGroup("foes");
        AkihabaraGamebox.trashGroup("bonus");
        AkihabaraGamebox.trashGroup("walls");
        AkihabaraGamebox.purgeGarbage();

        //default level
        if (level == null) {
            level = {
                level: "begin",
                x: 600,
                y: 600,
                introdialogue: false
            };
        }
        
        dialogues = { };
        delete tilemaps.map;


        // Here the map is loaded. During the load time, the game is still.
        AkihabaraGamebox.addBundle({
            file: "resources/bundle-map-" + level.level + ".js",
            onLoad: function() {
                AkihabaraTile.finalizeTilemap(tilemaps.map);


                AkihabaraGamebox.createCanvas("tileslayer", { w: tilemaps.map.w, h: tilemaps.map.h });


                

                AkihabaraGamebox.blitTilemap(AkihabaraGamebox.getCanvasContext("tileslayer"), tilemaps.map);


                AkihabaraTopview.spawn(AkihabaraGamebox.getObject("player", "player"), {
                    x: level.x,
                    y: level.y
                });

                tilemaps.map.addObjects();

                

            }
        });
    };
    
    maingame.initializeGame = function() {
        tilemaps = {
            _defaultblock: 100
        };

        AkihabaraGamebox.addObject({
            id: "bg",
            group: "background",
            blit: function () {
                AkihabaraGamebox.centerCamera(AkihabaraGamebox.getObject("player", "player"), { w: tilemaps.map.w, h: tilemaps.map.h });
                AkihabaraGamebox.blit(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getCanvas("tileslayer"), { dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), sourcecamera: true });
            }
        });


        AkihabaraGamebox.addObject(new Player());

    };

    maingame.setTileInMap = function(x, y, tile, smoke) {
        AkihabaraTile.setTileInMap(AkihabaraGamebox.getCanvasContext("tileslayer"), tilemaps.map, x, y, tile);
        if (smoke) {
            var ts = AkihabaraGamebox.getTiles(tilemaps.map.tileset);
            AkihabaraAudio.hitAudio("explosion"); // Switch sound
            maingame.addSmoke({ x: x * ts.tilew, y: y * ts.tilew, h: ts.tileh, w: ts.tilew, hh: ts.tilehh, hw: ts.tilehw, camera: true });
        }
    };



    // Add a still object. Are sprites that supports the z-index (houses, trees.) You can walk around these objects
    maingame.addBlock = function(x, y, tileset, frame) {
        AkihabaraGamebox.addObject({
            group: "walls",
            tileset: tileset,
            id: tileset + "_" + frame + "_" + x + "_" + y,
            zindex: 0, // Needed for zindexed objects
            x: x,
            y: y,
            frame: frame,

            initialize: function() {
                AkihabaraTopview.initialize(this); // Any particular initialization. Just the auto z-index
            },

            blit: function() {
                if (AkihabaraGamebox.objectIsVisible(this)) {
                    // Then the object. Notes that the y is y-z to have the "over the floor" effect.
                    AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {
                        tileset: this.tileset,
                        tile: this.frame,
                        dx: this.x,
                        dy: this.y + this.z,
                        camera: this.camera,
                        fliph: this.fliph,
                        flipv: this.flipv
                    });
                }
            }
        });
    };

    AkihabaraGamebox.go();
}

AkihabaraGamebox.onLoad(function () {
    
    Akihabara.createNewGame({
        title: "Rogue Test",
        splash: {
            footnotes: ["Game by the_Siman"],
            background: "resources/capstonesplash.png"
        }
    });
    
    AkihabaraGamebox.addBundle({
         file: "resources/bundle.js"
    });
    
    AkihabaraGamebox.loadAll(go);
    
}, false);




