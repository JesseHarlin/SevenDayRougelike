
var poop = {};

(function () {
    

    poop.generateRandomLevel = function (o) {

        //Tiles
        var nothingness = 0;
        var floor = 1;
        var floor2 = 3;
        var wall = 2;

        var randomfloor = 3;
        var leaves = [];


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

        var makeRoomSquare = function (node, tile) {
            var height = node.h + node.y;
            var width = node.w + node.x;
            for (var i = node.y; i < height; i++) {
                for (var j = node.x; j < width; j++) {
                    level[i][j] = tile || node.rgba;
                }
            }
        };

        var colorCentroid = function (node, tile) {
                level[node.centroid.y][node.centroid.x] = tile;
        };

        var colorCorners = function (node, tile) {
            level[node.corner.tl.y][node.corner.tl.x] = tile;
            level[node.corner.tr.y][node.corner.tr.x] = tile;
            level[node.corner.bl.y][node.corner.bl.x] = tile;
            level[node.corner.br.y][node.corner.br.x] = tile;
        };

        var processLeaf = function (node) {

            var _w = Math.floor((Math.random() * node.w * 0.5) + node.w * 0.5);
            var _h = Math.floor((Math.random() * node.h * 0.5) + node.h * 0.5);
            
            var _remaindH = Math.floor((node.h - _h)/2);
            var _remaindW = Math.floor((node.w - _w) / 2);

            node.subspace = {
                w: _w,
                h: _h,
                x: node.x + _remaindW,
                y: node.y + _remaindH,
            };

            //centroid
            node.subspace.centroid = {
                x: Math.floor(node.subspace.x + (_w / 2)),
                y: Math.floor(node.subspace.y + (_h / 2))
            };

            //corner
            node.subspace.corner = {
                tl : {
                    x: node.subspace.x,
                    y: node.subspace.y
                },
                tr : {
                    x: (node.subspace.x + node.subspace.w) -1,
                    y: node.subspace.y 
                },
                bl : {
                    x: node.subspace.x,
                    y: (node.subspace.y + node.subspace.h) -1
                },
                br : {
                    x: (node.subspace.x + node.subspace.w) - 1,
                    y: (node.subspace.y + node.subspace.h) - 1
                }
            };
           
            
     

            leaves.push(node);
        };


        var level = populateNothingness();
        var getRandomColor = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.4)';
        };

        var getConstrainedRandomNumber = function (seed) {
            var num = Math.floor(Math.random() * (seed));
            if ((num >= o.minSubdivideAmt) && (num <= (seed - o.minSubdivideAmt))) {
                return num;
            }
            return getConstrainedRandomNumber(seed);
        };

        //can replace with different subdivisions
        var bisectNode = function (_divDir, _parent, _depth) {
            var children = [];
            
            var startx = _parent.x;
            var starty = _parent.y;
            var width = _parent.w;
            var height = _parent.h;

            var randomNumber;
            var remainder;

            if (_divDir) {
                randomNumber = getConstrainedRandomNumber(width);
                remainder = width - randomNumber;
                children.push({
                    x : startx,
                    y : starty,
                    w: randomNumber,
                    h: height,
                    rgba: getRandomColor()
                });
                children.push({
                    x: startx + randomNumber,
                    y: starty,
                    w: remainder,
                    h: height,
                    rgba: getRandomColor()
                });

            } else {
                randomNumber = getConstrainedRandomNumber(height);
                remainder = height - randomNumber;
                children.push({
                    x: startx,
                    y: starty,
                    w: width,
                    h: randomNumber,
                    rgba: getRandomColor()
                });
                children.push({
                    x: startx,
                    y: starty + randomNumber,
                    w: width,
                    h: remainder,
                    rgba: getRandomColor()
                });
            }
            return children;
        };
        
        var parentmostNode = {};
        
        function generateTree(pnode, pheight) {

            var node = $.extend(pnode, {
                x: 0,
                y: 0,
                w: o.width,
                h: o.height,
                rgba: getRandomColor()
            });
            
            var height = pheight;
            var generateLeaf = function(node, height) {
                if (height === 0 || node.w <= o.minParentWidth || node.h <= o.minParentWidth) {
                    processLeaf(node);
                    return node;
                }
                var temp = node;
                var childLength = temp.children ? temp.children.length : 0;
                if (!childLength) {
                    temp.children = bisectNode(height % 2, temp);
                    generateLeaf(temp, height);
                }
                for (var i = 0; i < childLength; i++) {
                    generateLeaf(temp.children[i], height - 1);
                }
            };
            generateLeaf(pnode, pheight);
            return pnode;
        }



        var depth = o.divisions;

        var tree = generateTree(parentmostNode, depth);


        var traverseTree = function (_tree, singleCallback, batchCallback, d) {
            var traverseLeaf = function (node, dep) {

                singleCallback.call(this, node, dep);

                var childLength = node.children ? node.children.length : 0;
                if (childLength) {
                    dep--;
                    var batch = [];
                    for (var i = 0; i < childLength; i++) {
                        traverseLeaf(node.children[i], dep);
                        batch.push(node.children[i]);
                    }
                    batchCallback.call(this, batch);
                }
            };

            traverseLeaf(tree, d);
        };

        var  singleCallback = function (node, d) {
            //makeRoomSquare(n);

            if (!node.subspace) {
                console.log('parent', d, node);
            }

            if (node.subspace) {
                
                console.log('leaf', d, node);

                makeRoomSquare(node.subspace, 2);
                colorCentroid(node.subspace, 4);
                colorCorners(node.subspace, 4);
            }
        };


        var drawRightAngle = function (x1, x2, y1, y2, c) {


            if (x1 > x2) {

                for (var i = x2; i < x1; i++) {

                    //console.log('-->',i);

                    level[y1][i] = c;
                }
            } else {
                for (var i = x1; i < x2; i++) {
                    
                    //console.log('-->', i);

                    level[y1][i] = c;
                }
            }

        };


        var batchCallback = function (children) {

            if (children[0].subspace && children[1].subspace) {


                var y0 = children[0].subspace.centroid.y;
                var y1 = children[1].subspace.centroid.y;
                var x0 = children[0].subspace.centroid.x;
                var x1 = children[1].subspace.centroid.x;
                var c0 = '#00CCFF';
                var c1 = '#FFcc00';


                drawRightAngle(x0, x1, y0, y1, c0);

            }

        };

        console.log("DEPTH",depth);

        traverseTree(tree, singleCallback, batchCallback, depth);

        return level;
    };




})();


