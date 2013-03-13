
var poop = {};

(function () {
    

    poop.generateRandomLevel = function (o) {



        //Tiles
        var nothingness = 0;
        var floor = 1;
        var floor2 = 3;
        var wall = 2;


        var populateNothingness = function () {
            var level = [];
            for (var i = 0; i < o.height; i++) {
                var tr = [];
                for (var j = 0; j < o.width; j++) {
                    tr.push(nothingness);
                }
                level.push(tr);
            }
            return level;
        };


        var makeRoomSquare = function (node) {
            var height = node.height + node.starty;
            var width = node.width + node.startx;

            console.log('w x h',width, height);

            var endhDepth = height - 1;
            var endwDepth = width - 1;

            for (var i = node.starty; i < height; i++) {
                
                for (var j = node.startx; j < width; j++) {
                    
                    if (i == node.starty || j == node.startx ||
                        i == endhDepth || j == endwDepth) {
                        
                        level[i][j] = wall;
                    } else {
                        level[i][j] = floor;
                    }
                }
                
            }
        };

        var level = populateNothingness();

        var leafPile = [];


        var bisectNode = function (divDir, node) {

            var squareNodes = [];

            var startx = node.startx || 0;
            var starty = node.starty || 0;
            var width = node.width || o.width;
            var height = node.height || o.height;

            

            if (!divDir) {
                var  randomNumber = Math.floor(Math.random() * width);
                var remainder = width - randomNumber;

                console.log(width, randomNumber, remainder);

                squareNodes.push({
                    startx : startx,
                    starty : starty,
                    width: randomNumber,
                    height: height

                });
                
                squareNodes.push({
                    startx: startx +randomNumber ,
                    starty: starty,
                    width: remainder,
                    height: height
                });

            } else {
                
                randomNumber = Math.floor(Math.random() * height);
                
                squareNodes.push({
                    startx: startx,
                    starty: starty,
                    width: width,
                    height: randomNumber
                });
                squareNodes.push({
                    startx: startx,
                    starty: starty + randomNumber,
                    width: width,
                    height: height - randomNumber
                });

            }
            return squareNodes;
        };


        for (var i = 0; i < o.divisions; i++) {

            

            var nodes = bisectNode(1 % 2, {});

            var nodesLength = nodes.length;
            
            console.log(nodes)

            for (var j = 0; j < nodesLength; j++) {

                makeRoomSquare(nodes[j]);

            }
        }

        



        

        return level;
    };




})();