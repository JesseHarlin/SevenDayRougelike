(function() {
    

    return {
        // Graphic resources.
        addImage: [
            ["logo", "resources/title.png"],
            ["sprites", "resources/cels.png"],
            ["font", "resources/font.png"],
            ["fontbig", "resources/fontbig.png"]
        ],
        addFont: [
            { id: "small", image: "font", firstletter: " ", tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 0 },
            { id: "smallblackfont", image: "font", firstletter: " ", tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 8 },
            { id: "smallredfont", image: "font", firstletter: " ", tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 16 },
            { id: "smallgreenfont", image: "font", firstletter: " ", tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 24 },
            { id: "smallbluefont", image: "font", firstletter: " ", tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 32 },
            { id: "smallgradientred", image: "font", firstletter: " ", tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 40 },
            { id: "smallgradientbluegreyfont", image: "font", firstletter: " ", tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 48 },
            { id: "smallgreyfont", image: "font", firstletter: " ", tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 56 },
            { id: "big", image: "fontbig", firstletter: " ", tileh: 16, tilew: 8, tilerow: 255, gapx: 0, gapy: 0 }
        ],
        addTiles: [
            {
                id: "player",
                image: "sprites",
                tileh: 30,
                tilew: 30,
                tilerow: 12,
                gapx: 0,
                gapy: 0
            },
            {
                id: "house",
                image: "sprites",
                tileh: 90,
                tilew: 90,
                tilerow: 1,
                gapx: 0,
                gapy: 412
            }
        ],
        // Audio resources
        //addAudio:[
        //	["default-music",[audioserver+"intro.mp3",audioserver+"intro.ogg"],{channel:"bgmusic",loop:true}],
        //	["ending",[audioserver+"ending.mp3",audioserver+"ending.ogg"],{channel:"bgmusic",loop:true}],
        //	["cave",[audioserver+"cave.mp3",audioserver+"cave.ogg"],{channel:"bgmusic",loop:true}],

        //	["default-menu-option",[audioserver+"select.mp3",audioserver+"select.ogg"],{channel:"sfx"}],
        //	["default-menu-confirm",[audioserver+"start.mp3",audioserver+"start.ogg"],{channel:"sfx"}],
        //	["coin",[audioserver+"coin.mp3",audioserver+"coin.ogg"],{channel:"sfx"}],
        //	["sword",[audioserver+"sword.mp3",audioserver+"sword.ogg"],{channel:"sfx"}],
        //	["beep",[audioserver+"voice_narrator.mp3",audioserver+"voice_narrator.ogg"],{channel:"sfx"}],
        //	["beepbad",[audioserver+"voice_bad.mp3",audioserver+"voice_bad.ogg"],{channel:"sfx"}],
        //	["die",[audioserver+"die.mp3",audioserver+"die.ogg"],{channel:"sfx"}],
        //	["hit",[audioserver+"hit.mp3",audioserver+"hit.ogg"],{channel:"sfx"}],
        //	["explosion",[audioserver+"explosion.mp3",audioserver+"explosion.ogg"],{channel:"sfx"}],
        //	["megaexplosion",[audioserver+"megaexplosion.mp3",audioserver+"megaexplosion.ogg"],{channel:"sfx"}],
        //	["hurt",[audioserver+"eat.mp3",audioserver+"eat.ogg"],{channel:"sfx"}]
        //],

        addBundle: [
            // { file: "resources/bundle-credits.js" }
           
        ]
    };
})()