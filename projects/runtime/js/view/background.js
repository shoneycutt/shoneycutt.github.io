var background = function (window) {
    'use strict';

    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;

    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var buildings = [];
        var customStars = [];
        var customMoon;
        var customStarsSpec = [];

        // ANIMATION VARIABLES HERE:


        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'rgb(35, 40, 51)');
            background.addChild(backgroundFill);

            // TODO: 3 - Add a moon and starfield
            function randomNum(min, max){
                return(Math.random() * (+max - +min) + +min);
            }
            var customStar;
            for(var i = 0; i < 600; i++){
                
                customStar = draw.bitmap('img/customStar.gif');
                customStar.x = randomNum(1, 1500);
                customStar.y = randomNum(1, 1000);
                background.addChild(customStar);
                customStars.push(customStar);
            }
            
            var customStarSpec;
            for(var i = 0; i < 20; i++){
                customStarSpec = draw.bitmap('img/customStarSpec.png');
                customStarSpec.x = randomNum(1, 1500);
                customStarSpec.y = randomNum(1, 1000);
                background.addChild(customStarSpec);
                customStarsSpec.push(customStarsSpec);
            }
            
                customMoon = draw.bitmap('img/customMoon.png');
                background.addChild(customMoon);
                customMoon.x = 700;
                customMoon.y = 50;
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
                var building;
                for(var i=1;i<7;++i) {
                    var buildingHeight = randomNum(100,300);
                    building = draw.rect(75,buildingHeight,'LightGray','Black',1);
                    building.x = 225 * i;
                    building.y = groundY-buildingHeight;
                    background.addChild(building);
                    buildings.push(building);
                }

            // TODO 4: Part 1 - Add a tree
                tree = draw.bitmap('img/tree.png');
                tree.x = 900;
                tree.y = 200;
                background.addChild(tree);
        }

        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1;
            if(tree.x < -600) {
                tree.x = canvasWidth;
            }
            
            for(var i = 0; i < customStars.length; i++){
                customStars[i].x = customStars[i].x - .04;
                if(customStars[i].x < -50){
                    customStars[i].x = canvasWidth;
                }
            }
            
            for(var i = 0; i < customStarsSpec.length; i++){
                customStarsSpec[i].x = customStarsSpec[i].x = .04;
                if(customStarsSpec[i].x < -50){
                    customStarsSpec[i].x = canvasWidth;
                }
            }
            
            for(var i = 0; i < buildings.length; i++){
                buildings[i].x = buildings[i].x - .3;
                if(buildings[i].x < -100){
                    buildings[i].x = canvasWidth;
                }
            }
            customMoon.x = customMoon.x - .05;
            if(customMoon.x < -300){
                customMoon.x = canvasWidth;
            }
            // TODO 5: Part 2 - Parallax


        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;

        app.addResizeable(background);
        app.addUpdateable(background);

        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
