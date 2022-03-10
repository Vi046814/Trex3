
var trex ,trex_running,trex_collided;

var ground,groundImage,invisibleGround;

var nuvemGroup,nuvem,nuvemImg;

var obstacleGroup,obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6; 

var gameOver,gameOverImg,restart,restartImg;

var jumpSound,dieSound,checkPointSound;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){

 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 trex_collided = loadAnimation("trex_collided.png");

 groundImage = loadImage("ground2.png");

 nuvemImg = loadImage("cloud.png");

 obstacle1 = loadImage("obstacle1.png");
 obstacle2 = loadImage("obstacle2.png");
 obstacle3 = loadImage("obstacle3.png");
 obstacle4 = loadImage("obstacle4.png");
 obstacle5 = loadImage("obstacle5.png");
 obstacle6 = loadImage("obstacle6.png");

 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png");

 jumpSound = loadSound("jump.mp3");
 dieSound = loadSound("die.mp3");
 checkPointSound = loadSound("checkpoint.mp3");

}

function setup(){
  createCanvas(600,200);
  
  //create a trex e ground sprite

 trex = createSprite(40,140,30,150);
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collide",trex_collided);
 trex.scale = 0.5;
 trex.x - 50
 

 ground = createSprite(200,180,400,20);
 ground.addImage("ground", groundImage);

 invisibleGround = createSprite(200,190,400,20);
 invisibleGround.visible = false;

 
 var ceu = Math.round(random(10,25));
 console.log(ceu);

 nuvemGroup = new Group();
 obstacleGroup = new Group();

 gameOver = createSprite(300,100);
 gameOver.addImage("gameOver",gameOverImg);
 gameOver.scale = 0.5;

 restart = createSprite(300,140);
 restart.addImage("restart",restartImg);
 restart.scale = 0.4;

 trex.setCollider("rectangle",0,0,40,40);
 trex.debug = true;

}

function draw(){
  background("white");

  text("pontuação: " + score,500,50);


  if (gameState === PLAY) {

    trex.changeAnimation("running",trex_running);

    gameOver.visible = false;
    restart.visible = false;

    score = score + Math.round(frameCount/60);

    if (score % 100 === 0 && score > 0){
    checkPointSound.play();
    }

    if (keyDown("space") && trex.y > 170){
      trex.velocityY = -12;
      jumpSound.play();
    }

    trex.velocityY = trex.velocityY + 0.8;

    if(ground.x < 0){
      ground.x = ground.width/2;  
    } 

    ground.velocityX = (-4 + 2*score/100);

    criarNuvens();

    criarCactos();

    if (obstacleGroup.isTouching(trex)){
      gameState = END;
      dieSound.play();
    }

  }

  else if (gameState === END){

    ground.velocityX = 0;
    trex.velocityX = 0;

    trex.changeAnimation("collide",trex_collided);

    nuvemGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

  obstacleGroup.setLifetimeEach(-1);
  nuvemGroup.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

  if(mousePressedOver(restart)){
    reset();
  }

  }

  trex.collide(invisibleGround);
  drawSprites();
  }

function criarNuvens(){
  if(frameCount % 80 == 0){
    nuvem = createSprite(600, 50, 40, 10);
    nuvem.addImage("nuvem",nuvemImg);
    nuvem.velocityX = -4;
    nuvem.y = Math.round(random(10,110));
    nuvem.depth = trex.depth;
    trex.depth = trex.depth +1;
    nuvem.lifetime = 230;

   nuvemGroup.add(nuvem);
  }

}

function criarCactos(){
if(frameCount % 60 == 0){
  obstacle = createSprite(600,165,10,40);
  obstacle.scale = 0.4;
  obstacle.velocityX = (-4 + 2*score/100);
  obstacle.lifetime =230;

var cacto = Math.round(random(1,6));

 switch (cacto){
   case 1:
     obstacle.addImage(obstacle1);
     break;
   case 2:
     obstacle.addImage(obstacle2);
     break;
    case 3:
     obstacle.addImage(obstacle3);
     break;
    case 4:
     obstacle.addImage(obstacle4);
     break;
    case 5:
     obstacle.addImage(obstacle5);
     break;
    case 6:
     obstacle.addImage(obstacle6);
     break;
    default: break;

   
  }

  obstacleGroup.add(obstacle);
  }
 }

 function reset(){
   gameState = PLAY;
   trex.changeAnimation("running", trex_running);

   obstacleGroup.destroyEach();
   nuvemGroup.destroyEach();

   score = 0;
   frameCount = 0;
 }



