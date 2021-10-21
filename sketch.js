const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var player;
var enemy;
var laser;
var gameOver;
var Restart;
var score = 0;
var enemylaser;
var obstgroup, lasergroup, enlasergroup;
var aes;
var edges;


let engine;
let world;


function preload()
{
  playerImg =loadImage("pl.png")
}

function setup() 
{
  createCanvas(400,400);

  player = createSprite(200,340,10,20);
  player.addImage("player",playerImg);
  player.scale =0.4;

  edges = createEdgeSprites();

  gameOver= createSprite(200,200,20,20);

  Restart = createSprite(200,20,20,20);

  obstgroup = new Group();
  lasergroup = new Group();
  enlasergroup = new Group();

}


function obstacles()
{
  if(frameCount % 30 ===0)
  {enemy= createSprite(Math.round(0,200),0,20,20);
  enemy.shapeColor="pink";
  enemy.velocityY=5;

  /*var obstaclesPos = 
  [
    {x:100,y:0},
    {x:122,y:0},
    {x:320,y:0},
    {x:230,y:0},
    {x:30,y:0},
    {x:370,y:0},
  
  ]*/
  obstgroup.add(enemy);
  }
}


function stone()
{
  if(frameCount % 20===0) 
  {aes = createSprite(10,10,10,10);
   aes.x = Math.round(random(10,390));
   aes.y = Math.round(random(10,390));
   aes.shapeColor="green"
   aes.velocityX = Math.round(random(-4,4))
   aes.velocityY = Math.round(random(-4,4))

  }


}


function Laser()
{

    laser= createSprite(100,0,5,5);
    laser.shapeColor="blue"
    laser.lifetime=100;
    laser.velocityY=4;
    lasergroup.add(laser);

}

function enemyLaser()
{

  if(frameCount % 30 === 0)
  {
    enemylaser=createSprite(100,0,10,10);
    enemylaser.shapeColor="white"
    enemylaser.lifetime=100;
    enemylaser.velocityY=4;
    enlasergroup.add(enemylaser);

   }
}

function draw()
{
   background("black");



   if(keyDown("LEFT_ARROW"))
   {
     player.velocityX -= 10;
   }

   if(keyWentUp("LEFT_ARROW"))
   {
    player.velocityX = 0;
   }

   if(keyDown("RIGHT_ARROW"))
   {
     player.x += 3;
   }

   if(keyDown("UP_ARROW"))
   {
     player.y -= 3;
   }

   if(keyDown("DOWN_ARROW"))
   {
     player.y += 3;
   }

   if(keyDown("l"))
   {
    Laser();

   }

   if(keyDown("K"))
   {
     player.visible=false;
   }

   if(keyWentUp("K"))
   {
     player.visible=true;
   }

    obstacles();
    enemyLaser();
    stone();
   if(lasergroup.isTouching(obstgroup))
   {
     score+=2;
     obstgroup.destroyEach();
   }
   
   if(enlasergroup.isTouching(player))
   {
     score-=5;
   }
   player.bounceOff(edges);
   drawSprites();
}

