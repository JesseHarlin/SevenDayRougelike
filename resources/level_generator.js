﻿
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
                level[node.centroidY][node.centroidX] = tile;
        };

        var processLeaf = function (node) {

            var _w = Math.floor(Math.random() * node.w * 0.5) + node.w * 0.5;
            var _h = Math.floor(Math.random() * node.h * 0.5) + node.h * 0.5;
            var _remaindH = Math.floor((node.h - _h)/2);
            var _remaindW = Math.floor((node.w - _w) / 2);

            node.subspace = {
                w: _w,
                h: _h,
                x: node.x + _remaindW,
                y: node.y + _remaindH,
            };

            node.subspace.centroidX = Math.floor(node.subspace.x + (_w / 2));
            node.subspace.centroidY = Math.floor(node.subspace.y + (_h / 2));
            
            
 

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

        console.log(tree);

        //makeRoomSquare(node);
        //makeRoomSquare(node.subspace, 2);
        //colorCentroid(node.subspace, 4);

        var traversenode = function (_tree, callback, depth) {
            var _depth = depth;
            var traverseLeaf = function (node, _depth) {

                if (depth === 0) {
                    return;
                }

                var temp = node;
                var childLength = temp.children ? temp.children.length : 0;
                if (!childLength) {
                    
                }


                traverseLeaf(_depth-1);
            };

           traverseLeaf(tree);

        };

        traversenode(tree, function (n) {
            console.log(n);
        }, depth);



        return level;
    };




})();


