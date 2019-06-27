var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'rollingOb',x:400,y:groundY},
                {type: 'rollingOb',x:600,y:groundY},
                {type: 'rollingOb',x:900,y:groundY},
                {type: 'enemy',x:1400,y:groundY},
                {type: 'enemy',x:1600,y:groundY},
                {type: 'reward',x:1800,y:groundY-100},
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
        
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle); 
        
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
        
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        
        function createRollingOb(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 15;
            var rollingOb = game.createObstacle(hitZoneSize,damageFromObstacle);
            
            rollingOb.x = x;
            rollingOb.y = y;
            game.addGameItem(rollingOb);
            
            var obstacleImage = draw.bitmap('img/rollingOb.png');
            rollingOb.addChild(obstacleImage);
            
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        function createEnemy(x, y){
        
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
    
            enemy.x = 1600;
            enemy.y = groundY-50;
            enemy.velocityX = -3;
            enemy.rotationalVelocity = 10;
            
            
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };
            
            enemy.onProjectileCollision = function() {
                console.log('Halle hit the enemy');
                game.increaseScore(100);
                enemy.shrink();
            };
            game.addGameItem(enemy);
        }
        
        function createReward(x, y){
            
            var reward = game.createGameItem("reward",25);
            var rewardImage = draw.bitmap("img/reward.png");
            rewardImage.x = -25;
            rewardImage.y = -25;
            reward.addChild(rewardImage);
            
            reward.x = x;
            reward.y = y;
            reward.velocityX = -2.5;
            
            reward.onPlayerCollision = function(){
                console.log("Halle has collected a reward!");
                game.increaseScore(250);
                reward.shrink();
            };
            game.addGameItem(reward);
        }
    
            for(var i = 0; i < levelData["gameItems"].length; i++){
                if(levelData["gameItems"][i].type === "sawblade"){
                    var gameItem = createSawBlade(levelData["gameItems"][i].x, levelData["gameItems"][i].y);
                }
                
                else if(levelData["gameItems"][i].type === "rollingOb"){
                    var gameItem = createRollingOb(levelData["gameItems"][i].x, levelData["gameItems"][i].y);
                }
                
                else if(levelData["gameItems"][i].type === "enemy"){
                    var gameItem = createEnemy(levelData["gameItems"][i].x, levelData["gameItems"][i].y);
                }
                
                else if(levelData["gameItems"][i].type === "reward"){
                    var gameItem = createReward(levelData["gameItems"][i].x, levelData["gameItems"][i].y);
                }

            }

    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}