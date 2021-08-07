
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock, gameover, gameoverimg;
var gameState = "play";


function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameoverimg = loadImage("gameover.png");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 10;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  gameover = createSprite(300, 200, 50, 50);
  gameover.scale = 1.5;
  gameover.addImage("gameoverimage", gameoverimg);
  gameover.visible = false;

}


function draw() {
  background(255);


  if (gameState === "play") {

    if (keyDown("LEFT_ARROW")) {
      // write a code to move left when left arrow is pressed
      ghost.x = ghost.x - 5;
    }
    if (keyDown("RIGHT_ARROW")) {
      // write a code to move left when right arrow is pressed
      ghost.x = ghost.x + 5;

    }
    if (keyDown("SPACE")) {
      // write a code to move up when space arrow is pressed
      ghost.velocityY = -10;
    }


    ghost.velocityY = ghost.velocityY + 0.8;


    //write a condition for infinte scrolling tower
    if (tower.y > 600) {
      tower.y = width / 2;
    }

    spawnDoors();

    for (let i = 0; i < doorsGroup.length; i++) {
      if (doorsGroup.get(i).y > 600) {
        doorsGroup.get(i).destroy();
      }
    }
    //write a code to make climbersGroup collide with ghost change the ghost velocity 
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    //write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
  }
  drawSprites();
  if (gameState === "end") {
    tower.velocityY = 0;
    gameover.visible = true;
    doorsGroup.setVelocityYEach = 0;
    climbersGroup.setVelocityYEach = 0;
    invisibleBlockGroup.setVelocityYEach = 0;
    if (mousePressedOver(tower)) {
      reset();
    }
  }
}

function spawnDoors() {
  //write code here to spawn the clouds
  if (frameCount % 140 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    door.x = random(100, 500);
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 10;
    climber.velocityY = 10;
    invisibleBlock.velocityY = 10;

    //change the depth of the ghost and door
    ghost.depth = door.depth + 1;



    //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
    door.lifetime = 700;
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;


    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

function reset() {
  gameover.visible = false;
  tower.velocityY = 10;
  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  gameState = "play";
}