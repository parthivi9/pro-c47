var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zbimg,zombiegroup
var bullet,bulletImg
var bulletgroup
var gameState="fight"
var h1,h2,h3
var bullets=50
var heart_1,heart_2,heart_3
var life=3
var score=0
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zbimg=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
bulletImg =loadImage("assets/bullet.png")
h1=loadImage("assets/heart_1.png")
h2=loadImage("assets/heart_2.png")
h3=loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

heart_1=createSprite(displayWidth-200,40)
heart_1.addImage(h1)
heart_1.scale=0.3
heart_1.visible=false
heart_2=createSprite(displayWidth-100,40)
heart_2.addImage(h2)
heart_2.scale=0.3
heart_2.visible=false
heart_3=createSprite(displayWidth-150,40)
heart_3.addImage(h3)
heart_3.scale=0.3
heart_3.visible=false
zombiegroup=new Group ()
bulletgroup=new Group()
//bullet.visible=false
//bullet.debug=true

}

function draw() {
  background(0); 


if(gameState==="fight"){
  
  if(life===3){
    heart_3.visible=true
    heart_2.visible=false
    heart_1.visible=false
  }
  if(life===2){
    heart_2.visible=true
    heart_3.visible=false
    heart_1.visible=false
  }
  if(life===1){
    heart_1.visible=true
    heart_2.visible=false
    heart_3.visible=false
  }
  if(life===0){
    heart_1.visible=false
    heart_2.visible=false
    heart_3.visible=false
    gameState="End"
  }
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x = player.x-30}
    if(keyDown("RIGHT_ARROW")||touches.length>0){
      player.x = player.x+30}
  
  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
  // bullet.visible=true
  bullet=createSprite(displayWidth-1000,displayHeight-300,500,100)
  //bullet.addImage(bulletImg)
  bullet.velocityX=20
    player.addImage(shooter_shooting)
  
  
   bullet.y=player.y
   bullet.x=player.x+100
   bulletgroup.add(bullet)
   bullet.scale=0.04
   bullets=bullets-1
  }
  
  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }
  if (bullets===0){
    gameState="End"
  }

  if (zombiegroup.isTouching(bulletgroup)){
  for(var i=0;i<zombiegroup.length;i++){
    if(zombiegroup[i].isTouching(bulletgroup)){
      zombiegroup[i].destroy()
      bulletgroup.destroyEach()
      score=score+1
    }
  }
  console.log(frameCount)
  }
 if(zombiegroup.isTouching(player)){
 //  for(var j=0;j<zombiegroup.lenght;j++){
  //   if(zombiegroup[j].isTouching(player)){
       zombiegroup.destroyEach()
      life=life-1
  //   }
  // }
 }
 zombie()
}

  //moving the player up and down and making the game mobile compatible using touches

drawSprites();
textSize(20)
fill("white")
text("score="+score,displayWidth-350,displayHeight/3-200)
if(gameState==="End"){
  textSize(40)
  fill("red")
  text("GAME OVER",windowWidth/2-100,windowHeight/2)
  player.destroy()
}

}
function zombie(){
  if(frameCount% 60===0){
    var zb= createSprite(random(displayWidth-500,displayWidth-50),random(displayHeight-500,displayHeight-300),50,50)
zb.addImage(zbimg)
zb.scale=0.2
zb.velocityX=-10
zb.lifetime=800
zb.debug=true
 zb.setCollider("rectangle",0,0,300,900)
zombiegroup.add(zb)

  }
}