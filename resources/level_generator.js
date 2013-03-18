
var poop = {};

(function () {
    

    poop.generateRandomLevel = function (o) {



        //Tiles
        var nothingness = 0;
        var floor = 1;
        var floor2 = 3;
        var wall = 2;

        var randomfloor = 3;

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
                    
                    //if (i == node.starty || j == node.startx ||
                    //    i == endhDepth || j == endwDepth) {
                        
                    //    level[i][j] = wall;
                    //} else {
                        level[i][j] = node.color;
                    //}
                }
                
            }
            //floor = (floor + 1) % 16;

            //console.log('floor',floor);
        };

        var level = populateNothingness();


        var getRandomColor = function() {

            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);

            return 'rgba(' + r + ',' + g + ',' + b + ',0.4)';
        };
        

        //can replace with different subdivisions
        var bisectNode = function (divDir, node) {

            var squareNodes = [];

            

            var startx = node.startx  ;
            var starty = node.starty  ;
            var width = node.width ;
            var height = node.height ;

            var randomNumber;
            var remainder;

            if (divDir) {
                randomNumber = Math.floor(Math.random() * width);
                remainder = width - randomNumber;
                squareNodes.push({
                    startx : startx,
                    starty : starty,
                    width: randomNumber,
                    height: height,
                    color: getRandomColor()

                });
                squareNodes.push({
                    startx: startx + randomNumber,
                    starty: starty,
                    width: remainder,
                    height: height,
                    color: getRandomColor()
                });

            } else {
                randomNumber = Math.floor(Math.random() * height);
                remainder = height - randomNumber;
                squareNodes.push({
                    startx: startx,
                    starty: starty,
                    width: width,
                    height: randomNumber,
                    color: getRandomColor()
                });
                squareNodes.push({
                    startx: startx,
                    starty: starty + randomNumber,
                    width: width,
                    height: remainder,
                    color: getRandomColor()
                });
            }
            return squareNodes;
        };
        
        var parentmostNode = {
            startx: 0,
            starty: 0,
            width: o.width,
            height: o.height,
            color: getRandomColor()
        };

        
        var leafpile =[];
        leafpile = parentmostNode;

        var childLeafName = "children";

        for (var i = 0; i < o.divisions; i++) {
            console.log(i);
            var start = leafpile;

            while (leafpile[childLeafName] && leafpile[childLeafName].length) {
                leafpile = leafpile[childLeafName];
            }

            var leafpileLength = leafpile.length;
            if (leafpileLength == 2) {
                for (var j = 0; j < leafpileLength; j++) {
                    leafpile[j][childLeafName] = bisectNode((i % 2), leafpile[j]);
                }
            } else {
                leafpile[childLeafName] = bisectNode(i % 2, leafpile);
            }

            leafpile = start;


            var x = leafpile;
            console.log('node',x);
        }

        console.log('parentmostNode', parentmostNode);

        console.log('-------------------');
        var temp = parentmostNode;

        var stack = [];
        stack.push(temp);

        var ministack = [];

        for (var l = 0; l < temp[childLeafName].length; l++) {
            console.log('stack', stack.length, stack);
            
            ministack.push(temp[childLeafName][l]);
            stack.push(temp[childLeafName][l]);

            if (ministack[l][childLeafName]) {
                for (var m = 0; m < ministack[l][childLeafName].length; m++) {
                    stack.push(ministack[l][childLeafName][m]);
                }
            }
            console.log('stack', stack.length, stack);
        }


        var stacklength = stack.length;
        for (var k = 0; k < stacklength; k++) {
            makeRoomSquare(stack[k]);
        }


        console.log('final', parentmostNode, level);
        

        return level;
    };




})();

