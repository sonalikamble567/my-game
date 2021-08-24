var pickle, pickleJar, groundback, coin, obstacle, invisGround, edges, gameOver
var pickleImg, pickleJarImg, backgroundImg, coinImg, obstacleImg, gameOverImg
var fireGroup, coinGroup
var PLAY = 1
var END = 0
var score = 0
var gameState = PLAY

function preload(){
pickleImg = loadImage("player2.png")
pickleJarImg = loadImage("trophy.png")
backgroundImg = loadImage("bg1.jpg")
coinImg = loadImage("coin.png")
obstacleImg = loadImage("obstacle1.png")
gameOverImg = loadImage("gameover.png")
obstacle2Img = loadImage("obstacle2.png")
obstacle3Img = loadImage("obstacle3.png")


}

function setup(){
createCanvas(1500,600)
groundback = createSprite(200,350,1500,700)
groundback.addImage(backgroundImg)
groundback.scale=2.5
groundback.velocityX=-5
pickle = createSprite(50,550,50,50)
pickle.addImage(pickleImg)
pickle.scale=0.5
pickleJar = createSprite(1250,300,10,10)
pickleJar.addImage(pickleJarImg)
pickleJar.scale=0.50
invisGround = createSprite(0,570,3000,20)
invisGround.visible = false
groundback.x=groundback.width/2
console.log(displayWidth)
console.log(displayHeight)
fireGroup = new Group()
coinGroup = new Group()
pickle.debug = false
pickle.setCollider("rectangle",0,10,300,300)
}

function draw(){
background("green")
edges = createEdgeSprites()

pickle.collide(invisGround)
if (gameState===PLAY){
    if(groundback.x<600){
    groundback.x=1000
    }
 
if(keyDown("space")){
    pickle.velocityY = -10
}
pickle.velocityY = pickle.velocityY + 0.8
spawnObstacles()
spawnCoins()
if (keyDown("right")) {
    pickle.x = pickle.x +5
}
if (keyDown("left")){
    pickle.x = pickle.x -5
}
pickle.collide(edges)
if(coinGroup.isTouching(pickle)){
    score = score + 2
    coinGroup.destroyEach()
}

if(fireGroup.isTouching(pickle)){
    gameState = END
    fireGroup.destroyEach()
    coinGroup.destroyEach()
    pickle.addImage(gameOverImg)
}
textSize(20)
fill("green")
text ("score:"+score,750,50)
fill("white")
text ("Earn 30 points to grab me and win!", 1150, 200)
}
if(gameState === END){
groundback.velocityX = 0
pickle.velocityX = 0
pickle.velocityY = 0
}
drawSprites()
if(score >= 30 && pickle.isTouching(pickleJar)){
    textSize(60)
    fill("white")
    text("You win!",350,300)
    gameState = "won"
    groundback.velocityX = 0
pickle.velocityX = 0
pickle.velocityY = 0
pickle.visible = false
pickleJar.scale = 1.5
pickleJar.x = 1000
}

}

function spawnObstacles(){
    if (frameCount % 250 === 0){
        var obstacle = createSprite(1300,Math.round(random(200,400)),10,10)
        var rand = Math.round(random(1,3))
        console.log(rand)
        switch(rand){
            case 1 : obstacle.addImage(obstacleImg)
            break;
            case 2 : obstacle.addImage(obstacle2Img)
            break;
            case 3 : obstacle.addImage(obstacle3Img)
            break;
            default: break;
        }
        obstacle.velocityX = -10
        obstacle.debug = false
        obstacle.scale = 0.2
        fireGroup.add(obstacle)
        obstacle.lifetime=700
    }
}

function spawnCoins(){
    if (frameCount % 175 === 0){
        var coin = createSprite(1300,Math.round(random(100,450)),10,10)
        coin.addImage(coinImg)
        coin.velocityX = -3
        coin.scale = 0.2
        coinGroup.add(coin)
        coin.lifetime=700
    }
}