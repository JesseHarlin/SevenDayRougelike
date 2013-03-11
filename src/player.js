var Player = function() {
    return ({
        id: "player",
        group: "player",
        tileset: "player",
        zindex: 0,
        isPaused: false,

        doPause: function(p) {
            this.isPaused = p;
        },

        initialize: function() {
            AkihabaraTopview.initialize(this, {
                haspushing: true,
                frames: {
    
                    standup: { speed: 1, frames: [0] },
                    standdown: { speed: 1, frames: [3] },
                    standleft: { speed: 1, frames: [6] },
                    standright: { speed: 1, frames: [6] },
                    movingup: { speed: 3, frames: [0, 1, 0, 2] },
                    movingdown: { speed: 3, frames: [3, 4, 3, 5] },
                    movingleft: { speed: 3, frames: [6, 7] },
                    movingright: { speed: 3, frames: [6, 7] },
                    pushingup: { speed: 6, frames: [0, 1, 0, 2] },
                    pushingdown: { speed: 6, frames: [3, 4, 3, 5] },
                    pushingleft: { speed: 6, frames: [0, 7] },
                    pushingright: { speed: 6, frames: [6, 7] }
       
                },

                
                collisionEnabled: true,

                first: function() {

                    this.counter = (this.counter + 1) % 60;

                    AkihabaraTopview.controlKeys(this, {
                        left: 'left',
                        right: 'right',
                        up: 'up',
                        down: 'down'
                    });


                    AkihabaraTopview.handleAccellerations(this);
                    AkihabaraTopview.handleGravity(this);
                    AkihabaraTopview.applyForces(this);
                    AkihabaraTopview.applyGravity(this);
                    //AkihabaraTopview.tileCollision(this, tilemaps.map, "map", tilemaps._defaultblock);
                    AkihabaraTopview.floorCollision(this);
                    AkihabaraTopview.spritewallCollision(this, { group: "walls" });
                    AkihabaraTopview.adjustZindex(this);
                    AkihabaraTopview.setFrame(this);

                    this.toucheddown = false;
                    this.touchedup = false;
                    this.touchedleft = false;
                    this.touchedright = false;
                },

                blit: function() {

                    


                    

                    AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {
                        tileset: this.tileset,
                        tile: this.frame,
                        dx: this.x,
                        dy: this.y ,
                        camera: this.camera,
                        fliph: this.fliph,
                        flipv: this.flipv
                    });
                },
            });
        }
    });
};
