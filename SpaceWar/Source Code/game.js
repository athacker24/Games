//import {LoadScene} from "LoadScene.js";
//import {LoadScene} from "MenuScene.js";

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'Game', {
  preload: preload,
  create: create,
  update: update
 // scene: [LoadScene, MenuScene]

})
var cg = 0
let score  // to keep trak of score
let life = 5    // to keep track of player life
var playerSpeed = 250
let MaxLife = 5
var PlayerROF = 500  //base player ROF
let level    // to keep track of levels
let kill = 0    // to keep track of kills
let cursors   // for tracking player movement
let platforms  // creating a group of objects
let DeathBox   //definig the limit of the screen
let diamonds // enemy character 1
let player // defining layer character
let enemy2  // defining the enmy type 2
let counter = 0  // basic counter to check time ellapsed
var bulletTime = 0;  // defined time between two bullets of player
var EnemybulletTime = 0; // defined time between two bullets of enemy1
var BossbulletTime = 0 
var BossLaserTimeStart = 0; // defined time between two bullets of boss1
var BossLaserTime = 0;
const Diamond = [];  // holder array for enemy1
const BBackground = [];  // holder for different backgrounds in the game
var background
var RightHUD // define hud display
var j = 0  // counter variable used to calculate dimond array status
var Mul = 1 // difficuly level multiplier
var i= 0 // variable for loops
var w = 800, h = 600; // display sixe
var Bulltype = 1 // defines the type of bullets beig shot by payer
var cc // current counter for aray existance check
var explosion; // hit sound holder
var blaster; // laser sound holder
var BGAudio // background song holder
var ROF // control the rate of fire of enemy
var start = 0 // stores the game start satus
var button // generic buutton
var boss = 0
let bossOne
var moveBoss
var freeTime = 0; //time in between enemies going and boss coming
var check1 = 0
var bossOneHealth = 10  // Boss 1 health
var bossTwoHealth = 20  // Boss 2 health
var bossThreeHealth = 30 // Boss 3 health
var bossFourHealth = 50  // Boss 4 health
let BbossLaser
var BossLaserTimeEnd = 0
var k = 0
var e3called = 0  // e3 alive check
var kk
let enemy3  // defining enemy 3
let enemy4  // defining enemy 4
const enemythree = [];

var CanFireRockets,CanFireLaser
var enemy2Time =0 , enemy3Time =0
var previousNum1 , previousNum2 , previousNum
let rocket
var KT = 0
var damage
var currBulltType,currPlayerROF = 500,currShipType,currCannonType = 0, currBulletType = 1
var ParalizeCount = 0, shieldCount = 0, BullIsActive = false, StarFire = 0,RocketNum = 0

let eenemy4a
let eenemy4b
let eenemy4c

var Spawncount1 = 0
var Spawncount2 = 0
var Spawncount3 = 0

var E4aDead=1,E4bDead=1 , E4cDead=1
var E4aHealth = 10 , E4bHealth = 10 , E4cHealth = 10

var rocketTime = 0 , StarFireTime =  0
var ground
const enemyfour = [];
var e4 = 0
var e44
var e4called = 0
let spaceGold = 0 // defining curruency
let playerShield =  false  // setting player shield
const powerCollectionTime = [0,0,0,0,0,0];




function preload () {
// loading all assets required for the game, images sprites and sounds
  game.load.image('sky1', './assets/bgBlue.png')
  game.load.image('sky4', './assets/bgGreen.png')
  game.load.image('sky3', './assets/bgPurple.png')
  game.load.image('sky2', './assets/bgRed.jpg')
  game.load.image('MiddleHUD', './assets/Cpit1.png')
  game.load.image('enemy1', './assets/enemy/enemy1.png')
  game.load.image('enemy2', './assets/enemy/enemy2.png')  
  game.load.image('enemy3', './assets/enemy/enemy3.png')


  game.load.image('enemy4', './assets/enemy/enemy4.png')
  game.load.image('gem1', './assets/items/gem1.png')
  game.load.image('gem2', './assets/items/gem2.png')
  game.load.image('powerUp1', './assets/items/PowerUp1.png')
  game.load.image('powerUp2', './assets/items/PowerUp2.png')
  game.load.image('powerUp3', './assets/items/PowerUp3.png')
  game.load.image('shield', './assets/items/shieldItem.png')


  game.load.image('playerRocket', './assets/bullets/Rocket2.png')
  game.load.image('PlayerShieldIMG', './assets/items/PlayerShield.png')

  game.load.image('StartNew', './assets/StartNewHome.png', 240, 200);
  game.load.image('ResumePrevious', './assets/ResumeHome.png', 240, 200);


  game.load.image('BuyMemuIMG', './assets/Buy/BuyHome.png', 240, 200)
  game.load.image('BuyPupIMG', './assets/Buy/BuyPUP.png', 240, 200)
  game.load.image('BuyShipIMG', './assets/Buy/BuyShip.png', 240, 200)
  game.load.image('BuyWepIMG', './assets/Buy/BuyWep.png', 240, 200)
  game.load.image('BuyLogo', './assets/Buy/BuyLogo.png', 240, 200)
  game.load.image('BackLogo', './assets/Buy/back2.png', 240, 200)

  game.load.image('bullet2', './assets/bullets/bullet2.png');
  game.load.image('bullet3', './assets/bullets/bullet3.png');
  game.load.image('bullet', 'assets/bullets/bullet.png');


  game.load.image('hero', './assets/Player/player.png', 32, 32)
  game.load.image('hero2', './assets/Player/player2.png', 32, 32)
  game.load.image('hero3', './assets/Player/player3.png', 32, 32)
  game.load.image('hero4', './assets/Player/player4.png', 32, 32)
  game.load.image('hero5', './assets/Player/player5.png', 32, 32)
  game.load.image('hero6', './assets/Player/player7.png', 32, 32)

  game.load.image('LeftHUD1', './assets/HUD/leftlvl1.png', 32, 32)
  game.load.image('LeftHUD2', './assets/HUD/leftlvl2.png', 32, 32)
  game.load.image('LeftHUD3', './assets/HUD/leftlvl3.png', 32, 32)
  game.load.image('LeftHUD4', './assets/HUD/leftlvl4.png', 32, 32)  
  game.load.image('LeftHUD5', './assets/HUD/leftlvl5.png', 32, 32)
  game.load.image('LeftHUD6', './assets/HUD/leftlvl6.png', 32, 32)
  game.load.image('LeftHUD7', './assets/HUD/leftlvl7.png', 32, 32)
  game.load.image('LeftHUD8', './assets/HUD/leftlvl8.png', 32, 32)
  game.load.image('LeftHUD9', './assets/HUD/leftlvl9.png', 32, 32)
  game.load.image('LeftHUD10', './assets/HUD/leftlvl10.png', 32, 32)
  game.load.image('LeftHUD11', './assets/HUD/leftlvl11.png', 32, 32)
  game.load.image('LeftHUD12', './assets/HUD/leftlvl12.png', 32, 32)
  game.load.image('RightHUD', './assets/HUD/RightHUD.png', 32, 32)

  game.load.spritesheet('HUD', './assets/HUD.png', 240, 200)
  game.load.spritesheet('HUD2', './assets/HUD2.png', 238, 200, 2)
  game.load.spritesheet('SSpanner', './assets/spanner.png',32,32,2)
  game.load.image('Enemybullet', 'assets/Enemybullet.png');
  game.load.image('Startmenu', './assets/start.png', 240, 200);
  game.load.image('GameWon', './assets/win.png', 240, 200);
  game.load.image('PauseButton', './assets/pause.png', 240, 200);
  game.load.image('ResumeButton', './assets/resume.png', 240, 200);
  game.load.image('GameEnd', './assets/gameover.png', 240, 200);
  game.load.image('Sound', './assets/sound.png', 240, 200);
  game.load.image('Mute', './assets/mute.png', 240, 200);


  game.load.image('Boss1', './assets/Boss/boss1.png');
  game.load.image('Boss2', './assets/Boss/boss2.png');
  game.load.image('Boss3', './assets/Boss/8.png',32,32);
  game.load.image('Boss4', './assets/Boss/boss4.png',32,32);
  game.load.image('BossLaser', './assets/bullets/14.png');

  game.load.audio('explosion', './assets/explosion.mp3');
  game.load.audio('blaster', './assets/blaster.mp3');
  game.load.audio('backMusic','./assets/s1.mp3')
  game.load.audio('Life+','./assets/addlife.mp3')
  game.load.audio('DeathAud','./assets/death.mp3')
  game.load.audio('shootEnemy','./assets/shootEnemy.mp3')
  game.load.audio('collectSound','./assets/Gold3.mp3')
  game.load.audio('pauseSound','./assets/overload.mp3')
}


//-------------------------------- CREATE -------------------------------------------

//ran once befor the loop function starts
function create () {

 // add background to the game
  BBackground[0,1,2,3] = game.add.group();
  BBackground[3] = game.add.tileSprite(0, 0, 800, 600, 'sky4')
  BBackground[2] = game.add.tileSprite(0, 0, 800, 600, 'sky3')
  BBackground[1] = game.add.tileSprite(0, 0, 800, 600, 'sky2')
  BBackground[0] = game.add.tileSprite(0, 0, 800, 600, 'sky1') 


//time counter for checking when to launch waves
  game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this); 
  game.physics.startSystem(Phaser.Physics.ARCADE) // start game time counter 

// assign all sounds in game
  explosion = game.add.audio('explosion');  // for colission between enemy/enemy bullet and player
  blaster = game.add.audio('blaster');      // player laser sound
  LifeAudio = game.add.audio('Life+');      // spanner collection sound
  DeathAudio = game.add.audio('DeathAud')   // death audio
  BGAudio = game.add.audio('backMusic');    //backgroung music
  BGAudio.volume = .2                       // backdround music volume
  shootEnemy = game.add.audio('shootEnemy')
  collectSound = game.add.audio('collectSound')
  pauseSound = game.add.audio('pauseSound')
  

//hero bullet creation
  bullets = game.add.group();                             //creating a group gor player bullets
  bullets.enableBody = true;                              // enabling colliders and body physics
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');                   // creating a bullet pool
  bullets.setAll('anchor.x', 0.5);                        // anchor x for all bullets
  bullets.setAll('anchor.y', 1);
  bullets.setAll('outOfBoundsKill', true);                // kill bullets if outside game space
  bullets.setAll('checkWorldBounds', true);

  bullets2 = game.add.group();                             //creating a group gor player bullets
  bullets2.enableBody = true;                              // enabling colliders and body physics
  bullets2.physicsBodyType = Phaser.Physics.ARCADE;
  bullets2.createMultiple(30, 'bullet2');                   // creating a bullet pool
  bullets2.setAll('anchor.x', 0.5);                        // anchor x for all bullets
  bullets2.setAll('anchor.y', 1);
  bullets2.setAll('outOfBoundsKill', true);                // kill bullets if outside game space
  bullets2.setAll('checkWorldBounds', true);


  bullets3 = game.add.group();                             //creating a group gor player bullets
  bullets3.enableBody = true;                              // enabling colliders and body physics
  bullets3.physicsBodyType = Phaser.Physics.ARCADE;
  bullets3.createMultiple(30, 'bullet3');                   // creating a bullet pool
  bullets3.setAll('anchor.x', 0.5);                        // anchor x for all bullets
  bullets3.setAll('anchor.y', 1);
  bullets3.setAll('outOfBoundsKill', true);                // kill bullets if outside game space
  bullets3.setAll('checkWorldBounds', true);

  rocketPool = game.add.group();                             //creating a group gor player bullets
  rocketPool.enableBody = true;                              // enabling colliders and body physics
  rocketPool.physicsBodyType = Phaser.Physics.ARCADE;
  rocketPool.createMultiple(20, 'playerRocket');                   // creating a bullet pool
  rocketPool.setAll('anchor.x', 0.5);                        // anchor x for all bullets
  rocketPool.setAll('anchor.y', 1);
  rocketPool.setAll('outOfBoundsKill', true);                // kill bullets if outside game space
  rocketPool.setAll('checkWorldBounds', true);

// hero bullet burst
  Burstbullet = game.add.group();                             //creating a group gor player bullets
  Burstbullet.enableBody = true;                              // enabling colliders and body physics
  Burstbullet.physicsBodyType = Phaser.Physics.ARCADE;
  Burstbullet.createMultiple(30, 'bullet');                   // creating a bullet pool
  Burstbullet.setAll('anchor.x', 0.5);                        // anchor x for all bullets
  Burstbullet.setAll('anchor.y', 1);
  Burstbullet.setAll('outOfBoundsKill', true);                // kill bullets if outside game space
  Burstbullet.setAll('checkWorldBounds', true);

// player blast shot
  emitter = game.add.emitter(0, 0, 100);    // creating an emmiter which is used for the blast feature
  emitter.makeParticles('Enemybullet');
  emitter.gravity = 0;
  emitter.setRotation(0, 0)  // stop rotation of individual bullet
  emitter.setXSpeed(-500, 500);
  emitter.setYSpeed(500, -500);


  emitterLaser = game.add.emitter(0, 0, 100);  // crating a laser for boss
  emitterLaser.makeParticles('BossLaser');
  emitterLaser.gravity = 0;
  emitterLaser.setRotation(0, 0)
  emitterLaser.setXSpeed(0, 0);
  emitterLaser.setYSpeed(10000, 10000);



//enemy bullets
  Enemybullets = game.add.group();                             //creating a group gor player bullets
  Enemybullets.enableBody = true;                              // enabling colliders and body physics
  Enemybullets.physicsBodyType = Phaser.Physics.ARCADE;
  Enemybullets.createMultiple(390, 'Enemybullet');             // creating a bullet pool
  Enemybullets.setAll('anchor.x', 0.5);
  Enemybullets.setAll('anchor.y', 1);
  Enemybullets.setAll('outOfBoundsKill', true);                // kill bullets if outside game space
  Enemybullets.setAll('checkWorldBounds', true);



  Bossbullets = game.add.group();                             //creating a group gor player bullets
  Bossbullets.enableBody = true;                              // enabling colliders and body physics
  Bossbullets.physicsBodyType = Phaser.Physics.ARCADE;
  Bossbullets.createMultiple(390, 'Enemybullet');             // creating a bullet pool
  Bossbullets.setAll('anchor.x', 0.5);
  Bossbullets.setAll('anchor.y', 1);
  Bossbullets.setAll('outOfBoundsKill', true);                // kill bullets if outside game space
  Bossbullets.setAll('checkWorldBounds', true);


 
// player
  player = game.add.sprite(400,game.world.height/1.25, 'hero') // add player sprite
  game.physics.arcade.enable(player)                           // enabling colliders and body physics
  player.anchor.setTo(0.5,0.5)
  player.body.bounce.y = 0                                     // add player physics options
  player.body.gravity.y = 0
  player.body.gravity.x = 0
  player.body.collideWorldBounds = true                        // collide player with game boundries
  player.body.immovable = true



  playerShieldImg = game.add.sprite(player.x, player.y,"PlayerShieldIMG")  //image to depict activated shield
  playerShieldImg.anchor.setTo(0.5,0.5)
  game.physics.arcade.enable(playerShieldImg)
  playerShieldImg.immovable = true
  playerShieldImg.scale.setTo(.25,.25)
  playerShieldImg.visible = false  // set to invisible untill a shield is aCTIVATED



//creating Boss1
  bossOne = game.add.sprite( 100, 60, 'Boss1') // add bossOne sprite
  game.physics.arcade.enable(bossOne)                           // enabling colliders and body physics
  bossOne.scale.setTo(1.5,1.5)
  bossOne.enableBody = true;
  bossOne.anchor.setTo(0.5, 0.5);
  bossOne.body.collideWorldBounds = true
  bossOne.body.immovable = true
  moveBoss = game.add.tween(bossOne).to({ x: 700 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true)
  bossOne.visible = false
//creating booss 2
  bossTwo = game.add.sprite( 100, 60, 'Boss2') // add bossOne sprite
  game.physics.arcade.enable(bossTwo)                           // enabling colliders and body physics
  bossTwo.scale.setTo(1.5,1.5)
  bossTwo.enableBody = true;
  bossTwo.anchor.setTo(0.5, 0.5);
  bossTwo.body.collideWorldBounds = true
  bossTwo.body.immovable = true
  moveBoss2 = game.add.tween(bossTwo).to({ x: 700 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true)
  bossTwo.visible = false
//creating boss 3
  bossThree = game.add.sprite(100, h/7.5, 'Boss3') // add bossOne sprite
  game.physics.arcade.enable(bossThree)                           // enabling colliders and body physics
  bossThree.scale.setTo(1.5,1.5)
  bossThree.enableBody = true;
  bossThree.anchor.setTo(0.5, 0.5);
  bossThree.body.collideWorldBounds = true
  bossThree.body.immovable = true
  moveBoss3 = game.add.tween(bossThree).to({ x: 700 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true)
  bossThree.visible = false

//creating final boss
  bossFour = game.add.sprite(100, h/8, 'Boss4') // add bossOne sprite
  game.physics.arcade.enable(bossFour)                           // enabling colliders and body physics
  bossFour.scale.setTo(1.5,1.5)
  bossFour.enableBody = true;
  bossFour.anchor.setTo(0.5, 0.5);
  bossFour.body.collideWorldBounds = true
  bossFour.body.immovable = true
  moveBoss4 = game.add.tween(bossFour).to({ x: 700 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true)
  bossFour.visible = false



// spanner for adding life
  Spanner = game.add.group()                                   // create spanner group
  Spanner.enableBody = true;                                   // enabling colliders and body physics
  Spanner.physicsBodyType = Phaser.Physics.ARCADE;
  Spanner.createMultiple(1, 'SSpanner');                       // only one spanner in pool
  Spanner.setAll('anchor.x', 0.5);
  Spanner.setAll('anchor.y', 1);
  Spanner.setAll('outOfBoundsKill', true);                     // kill bullets if outside game space
  Spanner.setAll('checkWorldBounds', true);



  // creating gem1
  gem1 = game.add.group()                               //collectable gem, each gem will give 10 space Gold
  gem1.enableBody = true;
  gem1.createMultiple(5,'gem1');  // creating a pool of 5 gems. Max limit of active gems
  gem1.setAll('anchor.x', 0.5);
  gem1.setAll('anchor.y', 1);
  gem1.setAll('outOfBoundsKill', true);                     // kill gem1 if outside game space
  gem1.setAll('checkWorldBounds', true);


// creating gem2 same as gem 1 but with only one gem2 available in the pool. each gem 2 will give 50 space gold
  gem2 = game.add.group()
  gem2.enableBody = true;
  gem2.createMultiple(1,'gem2');
  gem2.setAll('anchor.x', 0.5);
  gem2.setAll('anchor.y', 1);
  gem2.setAll('outOfBoundsKill', true);                     // kill gem2 if outside game space
  gem2.setAll('checkWorldBounds', true);


  //creating powerUp1
  powerUp1 = game.add.group()
  powerUp1.enableBody = true;
  powerUp1.createMultiple(1,'powerUp1');
  powerUp1.scale.setTo(2,2)
  powerUp1.setAll('anchor.x', 0.5);
  powerUp1.setAll('anchor.y', 1);
  powerUp1.setAll('outOfBoundsKill', true);                     // kill powerUp1 if outside game space
  powerUp1.setAll('checkWorldBounds', true);

   //creating powerUp2
  powerUp2 = game.add.group()
  powerUp2.enableBody = true;
  powerUp2.createMultiple(1,'powerUp2');
  powerUp2.scale.setTo(2,2)
  powerUp2.setAll('anchor.x', 0.5);
  powerUp2.setAll('anchor.y', 1);
  powerUp2.setAll('outOfBoundsKill', true);                     // kill powerUp2 if outside game space
  powerUp2.setAll('checkWorldBounds', true);


    //creating powerUp3
  powerUp3 = game.add.group()
  powerUp3.enableBody = true;
  powerUp3.createMultiple(1,'powerUp3');
  powerUp3.scale.setTo(2,2)
  powerUp3.setAll('anchor.x', 0.5);
  powerUp3.setAll('anchor.y', 1);
  powerUp3.setAll('outOfBoundsKill', true);                     // kill powerUp3 if outside game space
  powerUp3.setAll('checkWorldBounds', true);


   //creating shield
  shield = game.add.group()
  shield.enableBody = true;
  shield.createMultiple(1,'shield');
  shield.scale.setTo(2,2)
  shield.setAll('anchor.x', 0.5);
  shield.setAll('anchor.y', 1);
  shield.setAll('outOfBoundsKill', true);                     // kill shield if outside game space
  shield.setAll('checkWorldBounds', true);



//HUD left hud creation
  platforms = game.add.group()                                   //create base HUD
  platforms.enableBody = true
  ground = platforms.create(-40, game.world.height - 140, 'LeftHUD1')
  ground.scale.setTo(.6,.4)
  ground.body.immovable = true                                   // HUD not movable

// right hud creation
  let RightHUD = platforms.create(w-296, h -140, 'RightHUD')
  RightHUD.scale.setTo(.6,.4)
  RightHUD.body.immovable = true

//bottom limit difining
  DeathBox = game.add.group()                                    // death collider, kills enemies which collide into it
  DeathBox.enableBody = true
  let Limits = DeathBox.create(-100, game.world.height - 1, 'MiddleHUD')
  Limits.scale.setTo(2,.3)
  Limits.body.immovable = true


//text boxes in the game
  scoreText = game.add.text(60, 20, '', { font: '20px Arial', fill: '#fff' }) // for score
  BulletPowerText = game.add.text(w-155,h-41, '', { font: '20px Arial', fill: '#fff' }) // for score
  BulletText = game.add.text(w-150,h-59, '', { font: '20px Arial', fill: '#fff' }) // for score
  StarFireText = game.add.text(w-79,h-32, '', { font: '18px Arial', fill: '#fff' }) // for score
  ShieldText = game.add.text(w-79,h-56, '', { font: '18px Arial', fill: '#fff' }) // for 
  RocketText = game.add.text(w-79,h-80, '', { font: '18px Arial', fill: '#fff' }) // for Rocket
  ROFText = game.add.text(w-170,h-78, '', { font: '20px Arial', fill: '#fff' }) // for ROF
  lifeText = game.add.text(50, game.world.height - 74, '', { font: '20px Arial', fill: '#fff' }) // for life
  levelText = game.add.text(210, game.world.height - 68, '', { font: '20px Arial', fill: '#fff'}) // for level
  spaceGoldText = game.add.text(50, game.world.height - 44, '', { font: '20px Arial', fill: '#fff' })
  RestartText = game.add.text(w/2, h-130, '', { font: '25px Arial', fill: '#fff' })
  RestartText.anchor.setTo(0.5,0.5)
  RestartText.text = "PRESS R TO RESTART THE GAME"
  RestartText.visible = false
  HighScoreText = game.add.text(w/2, 100, '', { font: '25px Arial', fill: '#fff' })
  HighScoreText.anchor.setTo(0.5,0.5)
  HighScoreText.text = "Your HIGHEST SCORE IS : " + localStorage.getItem('HighestScore')
  HighScoreText.visible = false
  levelText.anchor.setTo(0.5,0.5)
  scoreText.text = 'SCORE: ' + score
  levelText.text = ' ' + level  
  spaceGoldText.text = '      ' + spaceGold
  lifeText.text = '      ' + life
  ROFText.text = ' * '
  BulletPowerText.text = ' *  '
  BulletText.text = ' * '
  StarFireText.text = '' + StarFire
  ShieldText.text = '' + shieldCount
  RocketText.text = ''+ RocketNum

//buttons and inputs
  cursor = game.input.keyboard.createCursorKeys()                       // get input  for player movemnet
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);    // spacbar for shooting
  RocketButton = game.input.keyboard.addKey(Phaser.Keyboard.H);   // H to shoot rocket
  RocketButton.onDown.add(rocketFireCheck,this)
  StarButton = game.input.keyboard.addKey(Phaser.Keyboard.J);   //j to shoot StarFire
  StarButton.onDown.add(BurstFire,this)
  ParalizeButton = game.input.keyboard.addKey(Phaser.Keyboard.K);  // K to stop enemy from shooting
  ParalizeButton.onDown.add(killPowerUp3,this)
  ShieldButton = game.input.keyboard.addKey(Phaser.Keyboard.L);  //l to activate shield
  ShieldButton.onDown.add(killShield,this)
  RestartButton = game.input.keyboard.addKey(Phaser.Keyboard.R);  // r to restart game
  RestartButton.inputEnabled = false


  BuyHome = game.add.image(w/2,h/2, 'BuyMemuIMG');  // buy Options
  BuyHome.anchor.setTo(0.5, 0.5);
  BuyHome.scale.setTo(1.3,1.3)
  BuyHome.visible = false

  BuyWEP = game.add.image(w/2,h/2, 'BuyWepIMG');  // buy Options weapons
  BuyWEP.anchor.setTo(0.5, 0.5);
  BuyWEP.scale.setTo(1.3,1.3)
  BuyWEP.visible = false

  BuyPUP = game.add.image(w/2,h/2, 'BuyPupIMG');  // buy Options powerups
  BuyPUP.anchor.setTo(0.5, 0.5);
  BuyPUP.scale.setTo(1.3,1.3)
  BuyPUP.visible = false

  BuySHIP = game.add.image(w/2,h/2, 'BuyShipIMG');  // buy Options ship upgrade
  BuySHIP.anchor.setTo(0.5, 0.5);
  BuySHIP.scale.setTo(1.3,1.3)
  BuySHIP.visible = false

  Buybutton = game.add.button(w-170, 10, 'BuyLogo', junk, this, 2, 1, 0); //buy logo button
  Buybutton.visible = false
  Buybutton.scale.setTo(.1,.1)

  Backbutton = game.add.button(w/2 -240, h-220, 'BackLogo', junk, this, 2, 1, 0);  //back button in buymenu
  Backbutton.visible = false
  Backbutton.scale.setTo(.2,.2)



  Soundbutton = game.add.button(30,30, 'Sound', SoundUpdate, this, 2, 1, 0);  //mute button
  Soundbutton.anchor.setTo(0.5, 0.5);                                         
  Soundbutton.scale.setTo(.06,.05)
  Mutebutton = game.add.button(30,30, 'Mute', MuteUpdate, this, 2, 1, 0);     //unmute button
  Mutebutton.anchor.setTo(0.5, 0.5);
  Mutebutton.scale.setTo(.06,.05)
  Mutebutton.visible = false
  button = game.add.button(w/2,h/2, 'Startmenu', SU, this, 2, 1, 0);  // Start Options
  button.anchor.setTo(0.5, 0.5);
  button2 = game.add.button(w-600,h/2, 'StartNew', StartUpdate, this, 2, 1, 0);  // start new game
  button2.anchor.setTo(0.5, 0.5);
  button2.scale.setTo(.5,.5)
  button2.visible = false
  button3 = game.add.button(w-200,h/2, 'ResumePrevious', ResumeUpdate, this, 2, 1, 0);  // Start previous
  button3.anchor.setTo(0.5, 0.5);
  button3.scale.setTo(.5,.5)
  button3.visible = false  // make invisible


// for pause features
  Pausee()                    //call pause function to create all pause functionalities

// Pre start game setup
  hide(StarFireText,ShieldText,ROFText,BulletPowerText,BulletText,RocketText,spaceGoldText,levelText,lifeText,scoreText,platforms,Pbutton)  // hide all buttons not needed before game start

//input handelers which allow for only one click actions
  game.input.keyboard.removeKeyCapture(Phaser.Keyboard.J);
  game.input.keyboard.removeKeyCapture(Phaser.Keyboard.H);
  game.input.keyboard.removeKeyCapture(Phaser.Keyboard.L);
  game.input.keyboard.removeKeyCapture(Phaser.Keyboard.k);
  game.input.keyboard.removeKeyCapture(Phaser.Keyboard.R);


  
}
var checktt // makeshift variable to store level from DB
function SU(){
 // score = localStorage.getItem('HighestScore')
  checktt = parseInt(localStorage.getItem('HighestLevel'),10) // get level form local storage
  if(checktt>1){  // check if the game has been played before
    level = checktt - 1 // if it has been then assign the right level to start at
    score = level*100   // and the right score
    scoreText.text = "SCORE " + score
    ScoreUpdate()  // call score update to get the right background and level variables set
    hide(button)
    show(button2, button3)
  }
  else {   // if not played before
    level =1   // set level as 1 and score as 0 
    score = 0
    StartUpdate()
    hide(button)
  }
}

//to mute
function SoundUpdate(){
  game.sound.mute = true      // mute all game sounds
  Mutebutton.visible = true   // Show muted logo
  Soundbutton.visible = false
}

//to unmute
function MuteUpdate(){
  game.sound.mute = false     //unmute all sounds
  Mutebutton.visible = false  // change to unmuted logo
  Soundbutton.visible = true
}

// to pause
function StartUpdate()
{
  VarUpdate(1)
  game.paused = false             // game has started
  button2.destroy()
  button3.destroy()
  button.destroy()                // destroy the start HUD
  start = 1                       // Set global start var to 1
  Enemy1()
  show(Buybutton,StarFireText,ShieldText,ROFText,BulletPowerText,BulletText,RocketText,spaceGoldText,levelText,lifeText,scoreText,platforms,Pbutton)
  BGAudio.loop = true             // loop backgroung audio
  BGAudio.play()                 // play backgroung Audio
}

// Function to configure the game to play from a specific point based on previous score.
function ResumeUpdate()
{
  VarUpdate(2)
  game.paused = false             // game has started
  button2.destroy()
  button3.destroy()
  button.destroy()                // destroy the start HUD
  start = 1                       // Set global start var to 1
  Enemy1()
  show(Buybutton,StarFireText,ShieldText,ROFText,BulletPowerText,BulletText,RocketText,spaceGoldText,levelText,lifeText,scoreText,platforms,Pbutton)
  BGAudio.loop = true
  BGAudio.play()                 // play backgroung Audio
}


// update function called by Start and Resume to enter all relevent data from DB to game.
function VarUpdate(choiceNum)
{
  if(choiceNum == 1)
  {
    localStorage.setItem("HighestLevel", JSON.stringify(1)) // set highest lvl to 1 if first play of game
    score = 0
    ScoreUpdate()
    level = 1
    scoreText.text = 'SCORE: ' + score
    levelText.text = ' ' + level  
  }
  else if(choiceNum == 2)  // if it i s resume,
  {
    ScoreUpdate()
  }

}




//------------------------------------- UPDATE ------------------------------//
// Main loop function 
function update () {
//game.physics.arcade.moveToObject(rocket,Diamond[1],700, 2000);
  if(life<1) // check life
  {
    EndGame() //  call end game for finish game
  }

//to check level according to score

const highScore = JSON.parse(localStorage.getItem('HighestScore'))   //  update information to the local storage
if(highScore < score)
localStorage.setItem("HighestScore", JSON.stringify(score))

const highLevel = JSON.parse(localStorage.getItem('HighestLevel'))
if(highLevel < level)
localStorage.setItem("HighestLevel", JSON.stringify(level))


  ScoreUpdate()  

// add rolling background
  BBackground[3].tilePosition.y += 2;
  BBackground[2].tilePosition.y += 2;
  BBackground[1].tilePosition.y += 2;
  BBackground[0].tilePosition.y += 2;


  // update to check the current power ups held with player and their time to live update
  powerUpUpdate()


// if game has stared
  if(start == 1){ 


  Mul = 1 + (0.2*(level-1)); // intensity of game depends on Mul which depends on the level

// detirmine enemy waves timings and spanner timings
  if(enemy2Time<game.time.now && boss == 0){
    Enemy2()  // enemy 2 wave call
  if(enemy3Time<game.time.now && boss == 0){
    Enemy1()  // enemy 1 wave call
    if(level > 3)
      Enemy3()  // call enemy 3 after level 3 only
    }

  }
  if(level == 7 && E4aDead!=0 && Spawncount1 == 0)   // spawn condition for Enemy4
  {
    Spawncount1++
    Enemy4(1,100,150)
  }
  if(level == 8 && E4aDead!=0 && E4bDead!=0 && Spawncount2 == 0)
  {
    Spawncount2++
    Enemy4(1,100,150)
    Enemy4(2,w-100,150)
  }
  if(level == 9 && E4aDead!=0 && E4bDead!=0 && E4cDead!=0 && Spawncount3 == 0)
  {
    Spawncount3++
    Enemy4(1,100,150)
    Enemy4(2,w-100,150)
    Enemy4(3,w/2,100)
  }
  

// spawn condition for Gem 1
  if((counter%(5/Mul)) == 0)
  {
    spawngem1()
  }


// spawn conditions for all collectables. Collectables are picked at random to appear in world space
  if(KT%7 == 0 && KT!=0)
  {
    KT++

    var pick = rand(1,8)
    if(pick == 1)
      spawnPowerUp1()
    else if(pick == 2)
      SpawnSpanner()
    else if(pick == 3)
      spawnPowerUp2()
    else if(pick == 4)
      spawnPowerUp3()
    else if(pick == 5)
      spawnShield()
    else if(pick == 6)
      SpawnSpanner()
    else if(pick == 7)
      SpawnSpanner()
    else if(pick == 8)
      SpawnSpanner()

  }

//adding all colliders and intractions in the game and assiging respective functions
  game.physics.arcade.collide(player,platforms)
  game.physics.arcade.collide(player,eenemy4c)

  game.physics.arcade.collide(player,eenemy4a)

  game.physics.arcade.collide(player,eenemy4b)

    game.physics.arcade.collide(player,platforms)

  game.physics.arcade.collide(player,platforms)

  game.physics.arcade.collide(player,platforms)

  game.physics.arcade.collide(player,platforms)


  game.physics.arcade.overlap(player, diamonds, HitPlayer, null, this)

  game.physics.arcade.overlap(player, enemy3, HitPlayer, null, this)

  game.physics.arcade.overlap(player, enemy2, HitPlayer, null, this)
  game.physics.arcade.overlap(DeathBox, killE1,null, this)
  game.physics.arcade.overlap(bullets, enemy2, collisionHandler, null, this);
  game.physics.arcade.overlap(bullets2, enemy2, collisionHandler, null, this);
  game.physics.arcade.overlap(bullets3, enemy2, collisionHandler, null, this);


  game.physics.arcade.overlap(bullets, eenemy4a, collisionHandlerE4a, null, this);
  game.physics.arcade.overlap(bullets2, eenemy4b, collisionHandlerE4b, null, this);
  game.physics.arcade.overlap(bullets3, eenemy4c, collisionHandlerE4c, null, this);
  game.physics.arcade.overlap(rocketPool, eenemy4c, collisionHandlerE4c, null, this);


  game.physics.arcade.overlap(bullets2, eenemy4a, collisionHandlerE4a, null, this);
  game.physics.arcade.overlap(bullets, eenemy4b, collisionHandlerE4b, null, this);
  game.physics.arcade.overlap(bullets2, eenemy4c, collisionHandlerE4c, null, this);
  game.physics.arcade.overlap(rocketPool, eenemy4b, collisionHandlerE4c, null, this);
  game.physics.arcade.overlap(rocketPool, eenemy4a, collisionHandlerE4c, null, this);


  game.physics.arcade.overlap(bullets3, eenemy4a, collisionHandlerE4a, null, this);
  game.physics.arcade.overlap(bullets3, eenemy4b, collisionHandlerE4b, null, this);
  game.physics.arcade.overlap(bullets, eenemy4c, collisionHandlerE4c, null, this);

  game.physics.arcade.overlap(emitter, diamonds, collisionHandler, null, this);
  game.physics.arcade.overlap(bullets, diamonds, collisionHandler, null, this);

  game.physics.arcade.overlap(bullets, enemy3, collisionHandler, null, this);
  game.physics.arcade.overlap(bullets3, enemy3, collisionHandler, null, this);
  game.physics.arcade.overlap(bullets2, enemy3, collisionHandler, null, this);

  game.physics.arcade.overlap(player, Enemybullets, HurtPlayer, null, this);
  game.physics.arcade.overlap(player, Spanner, AddLife, null, this);

  game.physics.arcade.overlap(player, gem1, killGem1, null, this);
  game.physics.arcade.overlap(player, gem2, killGem2, null, this);
  game.physics.arcade.overlap(player, powerUp1, killPowerUp1, null, this);
  game.physics.arcade.overlap(player, powerUp2, killPowerUp2, null, this);
  game.physics.arcade.overlap(player, powerUp3, killPowerUp3, null, this);
  game.physics.arcade.overlap(player, shield, killShield, null, this);

  game.physics.arcade.overlap(DeathBox, powerUp1, killLaser, null, this)
  game.physics.arcade.overlap(DeathBox, powerUp2, killLaser, null, this)
  game.physics.arcade.overlap(DeathBox, powerUp3, killLaser, null, this)
  game.physics.arcade.overlap(DeathBox, shield, killLaser, null, this)


  game.physics.arcade.overlap(DeathBox, enemy2,  killE1, null, this);
  game.physics.arcade.overlap(DeathBox, bullets, killE1, null, this);
  game.physics.arcade.overlap(DeathBox, bullets3, killE1, null, this);
  game.physics.arcade.overlap(DeathBox, bullets2, killE1, null, this);
  game.physics.arcade.overlap(DeathBox, Enemybullets, killE1, null, this);
  game.physics.arcade.overlap(DeathBox, Spanner, killE1, null, this);
  game.physics.arcade.overlap(DeathBox, gem2, killE1, null, this);
  game.physics.arcade.overlap(Enemybullets, bullets3, killBull, null, this);
  game.physics.arcade.overlap(Enemybullets, bullets2, killBull, null, this);
  game.physics.arcade.overlap(Enemybullets, bullets, killBull, null, this);
  game.physics.arcade.overlap(Bossbullets, bullets, killBull, null, this);
  game.physics.arcade.overlap(Bossbullets, bullets3, killBull, null, this);
  game.physics.arcade.overlap(Bossbullets, bullets2, killBull, null, this);
  game.physics.arcade.collide(player, emitterLaser, LaserHurtPlayer, null, this);
  game.physics.arcade.overlap(player, Bossbullets, HurtPlayer, null, this);

 //for when more than 2 sets of enemies1 are present in the scene and to handel array based enemies
  for(var p = 0; p<j; p++)  // j is the global array size count for Enemy 1
  {
      game.physics.arcade.overlap(bullets, Diamond[p], collisionHandler, null, this); // collider active on each array object
      game.physics.arcade.overlap(bullets2, Diamond[p], collisionHandler, null, this);
      game.physics.arcade.overlap(bullets3, Diamond[p], collisionHandler, null, this);
      game.physics.arcade.overlap(emitter, Diamond[p], collisionHandler, null, this);
      game.physics.arcade.overlap(rocketPool, Diamond[p], collisionHandler, null, this);
      game.physics.arcade.overlap(player, Diamond[p], HitPlayer, null, this)
      if(Diamond[p].alive)  // if enemy 1 at index i is alive
      {
        if(Diamond[p].y > game.world.height)  // if enemy1 is outside the bounds of the world kill 
        Diamond[p].kill()
      }

  }
// check collision with enemy 3
  for(var pp = 0; pp<k; pp++)  // kk is the global array size count for Enemy 3
  {
      game.physics.arcade.overlap(bullets, enemythree[pp], collisionHandler, null, this); // collider active on each array object
      game.physics.arcade.overlap(bullets3, enemythree[pp], collisionHandler, null, this)
      game.physics.arcade.overlap(bullets2, enemythree[pp], collisionHandler, null, this)
      game.physics.arcade.overlap(emitter, enemythree[pp], collisionHandler, null, this);
      game.physics.arcade.overlap(rocketPool, enemythree[pp], collisionHandler, null, this);

      game.physics.arcade.overlap(player, enemythree[pp], HitPlayer, null, this)
      if(enemythree[pp].alive)  // if enemy 1 at index i is alive
      {
        if(enemythree[pp].y > game.world.height)  // if enemy1 is outside the bounds of the world kill 
        enemythree[pp].kill()
      }

  }


  player.body.velocity.x = 0;
  if(playerShieldImg.visible == true)
    playerShieldImg.reset(player.x , player.y)

//Input handeler section
//player shoot
  if (fireButton.isDown){  
    fireBullet();
  }

  //create 
// move left
  if (cursor.left.isDown) {
    player.body.velocity.x = -playerSpeed
  }

//move right
  else if (cursor.right.isDown) {
    player.body.velocity.x = playerSpeed
  }

// move down
  if (cursor.down.isDown)
  {
      player.body.velocity.y = playerSpeed
  }

//move up
  else if (cursor.up.isDown)
  {
      player.body.velocity.y = -playerSpeed
  }

//stop movement if no key press
   else if (!cursor.up.isDown || !cursor.down.isDown)
  {
      player.body.velocity.y = 0
      player.body.velocity.y = 0

  }
// enemy shoot time
  if(game.time.now > EnemybulletTime)  
  {
   randomFire()  // call the bullet randamizer function
  }

  BossFire(bossOne)
  BossFire(bossTwo)
  BossFire(bossThree)
  BossFire(bossFour)


  if(emitterLaser)  //update laser x position to match bossOne
  {
    emitterLaser.x = bossOne.x
  }

}
}

// function to update powerUps collected
function powerUpUpdate(){


  if(powerCollectionTime[1] < game.time.now)  // Deactivate Bullet Upgrade
  {
    if(Bulltype > currBulletType && BullIsActive == true){
      BullIsActive = false
    }
    Bulltype = currBulletType
  }

  if(powerCollectionTime[2] < game.time.now)  // Deactivate ROF Upgrade
  {
    PlayerROF = currPlayerROF
      
  }

  if(powerCollectionTime[4] < game.time.now)  // Deactivate shield Upgrade
  {
    //console.log('Shield Deactivated')
    playerShield = false
    playerShieldImg.visible = false
  }


}

//function to check id boss is alive and accordingly start shooting.
function BossFire(bossX){

  if(boss = 1 && bossX.visible == true && game.time.now > BossbulletTime){ // check if boss1 has been created
    bossShoot(bossX) // make boss1 shoot
  }
  if(boss = 1 && bossX.visible == true){ // check if boss1 has been created
      LaserFire()
  }
 // if(boss = 1 && bossX.visible == true)
}


// function to create a gap between enemies dying and boss coing
function freeTravell(bossX)   // Limbo before boss appears
{                
  for(var p = 0; p<j; p++)  // j is the global array size count for Enemy 1
  {
      if(Diamond[p].alive)  // if enemy 1 at index i is alive
      {             
        Diamond[p].kill()
      }
  }
  for(var p = 0;p<k;p++)
  {
    if(enemythree[p].alive)
    {
      enemythree[p].kill()
    }
  }
 if(e4called == 1){
  if(E4aDead)
    eenemy4a.kill()
  if(E4bDead==0)
    eenemy4b.kill()
  if(E4cDead==0)
    eenemy4c.kill()
}
  if(game.time.now > freeTime){
    check1 = 1;
  }

}

//Shoot function of boss
function bossShoot(enemyX)
{
  Bbossbullet = Bossbullets.getFirstExists(false);  //remove bullet from pool

  if (Bbossbullet)
  {
      Bbossbullet.reset(enemyX.x +16, enemyX.y + 40);
      game.physics.arcade.moveToObject(Bbossbullet,player,120); // make bullet follow player 
      Bbossbullet.body.velocity.y = 200;   // speed of the bullet
      BossbulletTime = game.time.now  + 1000;
  }
}


//boss Laser shootinh function
function LaserFire()
{

  emitterLaser.x = bossOne.x;
  emitterLaser.y = bossOne.y;
  emitterLaser.start(true,5000,0,-10)

}


//functions to call boss and  set their colliders 
var repeatB1 = 0;
function bossCall1()
{            
  if(repeatB1 == 0){
    freeTime = game.time.now + 5000
    repeatB1 = 1
  }
  boss = 1   // 1 if boss is alive
    game.physics.arcade.collide(player,bossOne)

  game.physics.arcade.collide(bullets, bossOne, killBoss, null, this);
  game.physics.arcade.collide(bullets2, bossOne, killBoss, null, this);
  game.physics.arcade.collide(bullets3, bossOne, killBoss, null, this);
  game.physics.arcade.collide(rocketPool, bossOne, killBoss3, null, this);

  freeTravell(bossOne)     // call to limbo before boss apears
  if(check1 == 1 && bossOneHealth>0 && !bossOne.visible)
    bossOne.visible = true      //creats Boss1

}


//creating boss 2

var repeatB2 = 0;
function bossCall2()
{            
  if(repeatB2 == 0){
    freeTime = game.time.now + 5000
    repeatB2 = 1
  }
  boss = 1
      game.physics.arcade.collide(player,bossTwo)

    game.physics.arcade.collide(bullets, bossTwo, killBoss2, null, this);
    game.physics.arcade.collide(bullets2, bossTwo, killBoss2, null, this);
    game.physics.arcade.collide(bullets3, bossTwo, killBoss2, null, this);
    game.physics.arcade.collide(rocketPool, bossTwo, killBoss3, null, this);


  freeTravell(bossTwo)     // call to limbo before boss apears
  if(check1 == 1 && bossTwoHealth>0 && !bossTwo.visible )
    bossTwo.visible = true      //creats Boss1

}

// creating boss3
var repeatB3 = 0;
function bossCall3()
{            
  if(repeatB3 == 0){
    freeTime = game.time.now + 5000
    repeatB3 = 1
  }
  boss = 1
    game.physics.arcade.collide(player,bossThree)
    game.physics.arcade.collide(bullets, bossThree, killBoss3, null, this);
    game.physics.arcade.collide(bullets2, bossThree, killBoss3, null, this);
    game.physics.arcade.collide(bullets3, bossThree, killBoss3, null, this);
    game.physics.arcade.collide(rocketPool, bossThree, killBoss3, null, this);
  
  freeTravell(bossThree)     // call to limbo before boss apears
  if(check1 == 1 && bossThreeHealth>0 && !bossThree.visible )
    bossThree.visible = true      //creats Boss1

}

// creating boss 4
var repeatB4 = 0;
function bossCall4()
{            
  if(repeatB4 == 0){
    freeTime = game.time.now + 5000
    repeatB4 = 1
  }
  boss = 1
      game.physics.arcade.collide(player,bossFour)
    game.physics.arcade.collide(rocketPool, bossFour, killBoss3, null, this);

    game.physics.arcade.collide(bullets, bossFour, killBoss4, null, this);
    game.physics.arcade.collide(bullets3, bossFour, killBoss4, null, this);
    game.physics.arcade.collide(bullets2, bossFour, killBoss4, null, this);
  freeTravell(bossFour)     // call to limbo before boss apears
  if(check1 == 1 && bossFourHealth>0 && !bossFour.visible )
    bossFour.visible = true      //creats Boss1

}


//to randomoze bullets shot by enemy
function randomFire(){
  var xx = rand(0,Diamond.length-1)  // pick one enemy1 in each pass of the update function to shoot
  var yy = rand(0,enemythree.length-1) 
  var zz = rand(0,enemyfour.length-1)

  if(Diamond[xx].alive){  //check if the selected enemy1 is alive 
    EnemyFireBullet(Diamond[xx],xx) //call shoot bullet
    return 
    } 

  if(e3called == 1){                  // if e3 is alive fire two bullets
    if(enemythree[yy].alive){
      Enemy3FireBullet(enemythree[yy],0) 
      Enemy3FireBullet(enemythree[yy],1) 
    } 
  }

  if(e4called == 1){              // if e4 is alive fire bullets
    var xx = rand(1,3)
    if(xx ==1 && eenemy4a.alive)
      Enemy4FireBullet(eenemy4a,0)
    else if(xx == 2 && eenemy4b)
      Enemy4FireBullet(eenemy4b,0)
    else if(xx =3 && eenemy4c)
      Enemy4FireBullet(eenemy4c,0)
  }

}

//counter update method
function updateCounter() {
    counter++;
}

//collision between player and enemy
function HitPlayer(player, diamond)
{
  diamond.kill()

  if(!playerShield){
    explosion.play()
    life-=1   //decrease life
    turnHUDRed()  // make HUD blink red
    lifeText.text = '      ' + life
  }
}

//kill enemy when he collids with deathbox
function killE1(plat, objectpass)
{
  objectpass.kill()
}

// kill boss 1 function
function killBoss(boss1, bullet)
{
  bullet.kill()
  bossOneHealth -= damage;
  if(bossOneHealth < 1){
    boss1.kill()
    boss = 0
    score += 10
    check1 = 0
    scoreText.text = 'SCORE: ' + score
  }
}

// kill boss 2 function
function killBoss2(boss1, bullet)
{
  bullet.kill()
  bossTwoHealth -= damage;
  if(bossTwoHealth < 1){
    boss1.kill()
    boss = 0
    score += 10
    scoreText.text = 'SCORE: ' + score
  }
}

// kill boss 3 function
function killBoss3(boss1, bullet)
{
  bullet.kill()
  bossThreeHealth -= damage;
  if(bossThreeHealth < 1){
    boss1.kill()
    boss = 0
    score += 10
    scoreText.text = 'SCORE: ' + score
  }
}

// kill boss 4 function
function killBoss4(boss1, bullet)
{
  bullet.kill()
  bossFourHealth -= damage;
  if(bossFourHealth < 1){
    boss1.kill()
    boss = 0
    score += 10
    scoreText.text = 'SCORE: ' + score  //add emmiter
  }
}

// function to kill passed object
function killLaser(laser, plat)
{
  laser.kill()
}


//destroy bullets if they collide
function killBull(bull1, bull2){
  bull2.kill()
  bull1.kill()
}

// collision between enmy bullets and player
function HurtPlayer(player, EnemyBullet)
{
  EnemyBullet.kill()
  if(! playerShield ){
    explosion.play()
    //emitterLaser.destroy()
    life-=1   //decrease player life
    turnHUDRed(this)
    lifeText.text = '      ' + life
  }
}

// when laser collides with player
var countHit = 0
function LaserHurtPlayer(player, Laser)
{
  Laser.kill()
  if(! playerShield)
  {
  countHit ++
  explosion.play()  
  if(countHit>10){
    life-=1   //decrease player life
    turnHUDRed(this)
    lifeText.text = '      ' + life
    countHit = 0
  }
}
}


//collect spanners to increase life
function AddLife(player, spanner)
{
  spanner.kill()
  if(life<MaxLife){
  life+=1   // add life to player
  LifeAudio.play()
  turnHUDGreen(this)  // flash HUD green
  lifeText.text = '      ' + life
  //Bulltype ++
}
}


function killGem1(player, gem1)
{
  gem1.kill()
  collectSound.play()
  spaceGold+=10
  spaceGoldText.text = '      ' + spaceGold
}

function killGem2(player, gem2)
{
  gem2.kill()
  collectSound.play()
  spaceGold+=50
  spaceGoldText.text = '      ' + spaceGold
}

function killPowerUp1(player, powerUp1)   // BULLET Number UPGRADE
{
  powerUp1.kill()
  collectSound.play()
  if(Bulltype<4){
    Bulltype ++
    powerCollectionTime[1] = game.time.now + 15000
    console.log("power 1 activated ")
    BullIsActive = true
  }
  else
    console.log("max bull reached")
}

function killPowerUp2(player, powerUp2)  // RATE OF FIRE
{
  powerUp2.kill()
  collectSound.play()
  UpdateROF()
  powerCollectionTime[2] = game.time.now + 15000
  console.log("power 2 activated ")
}


function killPowerUp3(player, powerUp3)  //PARALIZE
{
  if(powerUp3){    // if it is a collectable then we kill it
    powerUp3.kill()
    collectSound.play()
  }
  else if(!powerUp3){  //use from bought power ups
    if(ParalizeCount < 1){
      console.log("not enough power up")
      return;
    }
  }
  EnemybulletTime = game.time.now  + 8000;
  console.log("power 3 activated ")
}


function killShield(player1, shield)   // Shield update and showing on HUD accordingly
{
  if(shield){
    shield.kill()
    collectSound.play()
    console.log("shield actiavted")
    playerShield = true
    playerShieldImg.visible = true
    playerShieldImg.reset(player.x,player.y)
    powerCollectionTime[4] = game.time.now + 10000
    return
  }
  else if(!shield && shieldCount < 1)
  {
    console.log("not enough shields")
    return;
  }
  playerShield = true
  shieldCount--
  ShieldText.text = '' + shieldCount
  console.log("shield actiavted")
  playerShieldImg.visible = true
  playerShieldImg.reset(player.x,player.y)
  powerCollectionTime[4] = game.time.now + 10000
}


function collisionHandlerE4a(bullet,enemy)
{
  bullet.kill()
  if(E4aHealth>0){
    E4aHealth -= damage
    E4aDead = 0
  }
  if(E4aHealth <= 0){
    enemy.kill()
    E4aDead = 1
  }
}

function collisionHandlerE4b(bullet,enemy)
{
  bullet.kill()
  if(E4bHealth>0){
    E4bHealth -= damage
    E4bDead = 0
  }
  if(E4bHealth <= 0){
    enemy.kill()
    E4bDead = 1
  }
}

function collisionHandlerE4c(bullet,enemy)
{
  bullet.kill()
  if(E4cHealth>0){
    E4cHealth -= damage
    E4cDead = 0
  }
  if(E4cHealth <= 0){
    enemy.kill()
    E4cDead = 1
  }
}

//handels collision between hero bullet and enemy 
function collisionHandler (bullet, enemy) {

  // When a bullet hits an enemy we kill them both
  bullet.kill();
  if(enemy.y > -30){  //Cant kill enemy befor they are seen
    shootEnemy.play()
    score+=10
    kill++  // kill counter plus
    KT = kill
    if(KT%3 == 0 && KT!=0)
    {
    KT++
    //]console.log("gem2 called")
    spawngem2(enemy)
  }
    enemy.kill();
    scoreText.text = 'Score: ' + score
  }
}


//random intoger generator, accepts min and max values and generate an int between them
function rand(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
} 


// creation of enemy 1
function Enemy1()
{
  ROF = 1000  //define enemy 1 rate of fire
  counter++;  // increase counter so that more than one wave of enemy is not initiated per cycle
  diamonds = game.add.group()  // add enemy1 properties
  diamonds.enableBody = true
  diamonds.setAll('outOfBoundsKill', true);
  diamonds.setAll('checkWorldBounds', true);
  
  for(i = j; i<j+(5*Mul) ; i++)   // create i enemies per wave; i depends on MUL which depends on the level
  {
    Diamond[i] = diamonds.create(rand(70,770),rand(-100,-30),'enemy1') //create enemy at random location throught the game area with different velocity
    Diamond[i].body.gravity.y = (100 * Math.random() *0.02)
    Diamond[i].anchor.setTo(0.5,0.5)
  }

  j=i;  //update total array count

  for(var p = 0; p<j; p++) 
  {
    cc = 0
    if(Diamond[p].alive)
    {
      cc++  // track array statue for enemy1 - number of alive elements in the array
    }
    enemy3Time = game.time.now + 15000
  }
}


// creation of enemy 2 
function Enemy2()
{
  counter++ // increase counter so that more than one wave of enemy is not initiated per cycle
  enemy2 = game.add.group()
  enemy2.enableBody = true

  for(var i = 0; i<(5*Mul) ; i++) 
  {
    let eenemy2 = enemy2.create(rand(70,770),rand(-100,-30),'enemy2') //create enemy at random location throught the game area with different velocity
    eenemy2.body.gravity.y = (100000 * Math.random() *0.02)
  }
  enemy2Time = game.time.now + 20000

}


function Enemy3()
{
  e3called = 1
  ROF = 1000  //define enemy 1 rate of fire
  counter++;  // increase counter so that more than one wave of enemy is not initiated per cycle
  enemy3 = game.add.group()  // add enemy3 properties
  enemy3.enableBody = true
  enemy3.setAll('outOfBoundsKill', true);
  enemy3.setAll('checkWorldBounds', true);
  
  for(i = k; i<k+(2*Mul) ; i++)   // create i enemies per wave; i depends on MUL which depends on the level
  {
    enemythree[i] = enemy3.create(rand(70,770),rand(-200,-80),'enemy3') //create enemy at random location throught the game area with different velocity
    enemythree[i].anchor.setTo(0.5,0.5)
    enemythree[i].scale.setTo(2,2)
    enemythree[i].body.gravity.y = (100 * Math.random() *0.03)
    //   enemythree[i].body.gravity.y = (100 * Math.random() *0.03)
  }

  k=i;  //update total array count

  for(var p = 0; p<k; p++) 
  {
    kk = 0
    if(enemythree[p].alive)
    {
      kk++  // track array statue for enemy3 - number of alive elements in the array
    }
  }
}

function Enemy4(num, locX, locY){

  e4called = 1
  ROF = 1200
  enemy4 = game.add.group()  // add enemy3 properties
  enemy4.enableBody = true
  enemy4.setAll('outOfBoundsKill', true);
  enemy4.setAll('checkWorldBounds', true);

    console.log("creating E4")
    if(num == 1){
      eenemy4a = enemy4.create(locX,locY,'enemy4') //create enemy at random location throught the game area with different veelocity
      eenemy4a.body.gravity.y = 0
    }
    else if(num == 2){
      eenemy4b = enemy4.create(locX,locY,'enemy4') //create enemy at random location throught the game area with different velocity
      eenemy4a.body.gravity.y = 0
    }
    else if(num == 3){
      eenemy4c = enemy4.create(locX,locY,'enemy4') //create enemy at random location throught the game area with different velocity
      eenemy4a.body.gravity.y = 0
    }
   // for(var sc = 1 ; sc < 101 ; sc++)
    // enemy4.scale.setTo((sc/100)*2,(sc/100)*2)   // push to update later
}





// player bullet fire function time check
function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
      if(Bulltype == 1){
        //location.reload()
              firee(0,0)
      }
      else if(Bulltype == 2){
              firee(9-15,16-15)
              firee(19-15,16-15) // fire from location x and y
      }
      else if(Bulltype == 3){
              firee(0-15,16-15)
              firee(13-15,7-15)
              firee(26-15,16-15) // fire from location x and y
        }
      else if(Bulltype == 4){
              if(CanFireRockets){
                firee(0-15,16-15)
                firee(13-15,7-15)
                firee(26-15,16-15) // fire from location x and y
                RocketNum +=2
                rocketFire(1,35-15)
                rocketFire(1,-7-15)
              }
              else{
                firee(0-15,16-15)
                firee(13-15,-25-15)
                firee(13-15,20-15)
                firee(26-15,16-15)
              }
      }
    }

}

// function that detirmines the firing of a bullet of hero
function firee(x,y) 
{
  if(currCannonType == 0){
    bullet = bullets.getFirstExists(false);               // pick first bullet from pool and remove from pool
    damage = 1
        if (bullet)                                     //if bullet exists
        {
          bullet.reset(player.x + x, player.y + y);     //reset location
          bullet.body.velocity.y = -400  
          bulletTime = game.time.now + PlayerROF;             // add time gap for next bullet
          blaster.play()                                // play bullet sound
        }
      }

    else if(currCannonType == 1){
      bullet2 = bullets2.getFirstExists(false);               // pick first bullet from pool and remove from pool
      damage = 2
        if(bullet2)                                     //if bullet exists
        {
          bullet2.reset(player.x + x, player.y + y);     //reset location
          bullet2.body.velocity.y = -400  
          bulletTime = game.time.now + PlayerROF;             // add time gap for next bullet
          blaster.play()                                // play bullet sound
        }
      } 

      else if(currCannonType == 2){
         bullet3 = bullets3.getFirstExists(false);               // pick first bullet from pool and remove from pool
         damage = 3
        if (bullet3)                                     //if bullet exists
        {
          bullet3.reset(player.x + x,  player.y + y);     //reset location
          bullet3.body.velocity.y = -400  
          bulletTime = game.time.now + PlayerROF;             // add time gap for next bullet
          blaster.play()                                // play bullet sound
        }
      } 
}

function BurstFire() // star fire
{
 if(StarFire > 0 && StarFireTime <game.time.now)
 {

  emitter.x = player.x+15;
  emitter.y = player.y+15;
  emitter.start(true,5000,0,100)
  StarFire--
  StarFireText.text = '' + StarFire
  StarFireTime = game.time.now + 8000
  }
  else
    console.log("not rerady or no starfire")
}



function rocketFireCheck()
{
  if(currShipType>1)
    rocketFire()
  else
    console.log(" need to upgrade ship to shoot rockets")
}

function rocketFire(source , xLoc)
{

if(RocketNum>0 && (rocketTime<game.time.now)){
  rocket = rocketPool.getFirstExists(false);               // pick first rocket from pool and remove from pool
  var pick = 1,pick1 =-1 ,pick2 = -1
  RocketNum--
  RocketText.text = ''+ RocketNum
    if (rocket){                                     //if rocket exists
     // if(boss != 1)
      {  
        {
          if(source!= 1)
            rocket.reset(player.x, player.y);     //reset location
          if(source == 1)
            rocket.reset(player.x + xLoc, player.y + 15);
          //rocket.body.velocity.y = 10  
          for(var num = 0; num < j ; num++)
          {
            if(Diamond[num].alive && Diamond[num].y>1 && (Diamond[num].y < player.y-100) && ((Diamond[num].x >= player.x-300) && (Diamond[num].x <= player.x+300) ) && num!=previousNum1){
              pick1 = num
              break
          }
          }

          for(var num = 0; num < k ; num++)
          {
            if(enemythree[num].alive && enemythree[num].y>1 && (enemythree[num].y < player.y-100) && ((enemythree[num].x >= player.x-300) && (enemythree[num].x <= player.x+300) )&& num!=previousNum2){
              pick2 = num
              break
            }
          }

          if(pick1 == -1 && pick2 == -1){ 
            rocket.body.velocity.y = -400;
            if(source!= 1)
              rocketTime = game.time.now + 1000;
          }

          else if(pick1 == -1 && pick2 != -1){
            pick = pick2
            previousNum2 = pick
            if(enemythree[pick].alive && enemythree[pick].y>5&& (enemythree[pick].y < player.y-100) && ((enemythree[pick].x >= player.x-300) && (enemythree[pick].x <= player.x+300) )){
             game.physics.arcade.moveToObject(rocket,enemythree[pick],700, 500);
             previousNum2 = pick2
              if(source!= 1)
              rocketTime = game.time.now + 1000;             // add time gap for next rocket
               blaster.play()
            }
            else
              rocket.kill() 
          }


          else if(pick1 != -1 && pick2 == -1){
            pick = pick1
            previousNum1 = pick
             if(Diamond[pick].alive && Diamond[pick].y>5&& (Diamond[pick].y < player.y-100) && ((Diamond[pick].x >= player.x-300) && (Diamond[pick].x <= player.x+300) )){
              game.physics.arcade.moveToObject(rocket,Diamond[pick],700, 500);
              previousNum1 = pick1
              if(source!= 1)
                rocketTime = game.time.now + 1000;             // add time gap for next rocket
              blaster.play()
          }
          else
              rocket.kill() 
          }

          else if (pick1 != -1 && pick2 != -1){
            if(Diamond[pick1].y>enemythree[pick2].y){
              pick = pick1
              previousNum1 = pick
               if(Diamond[pick].alive && Diamond[pick].y>5&& (Diamond[pick].y < player.y-100) && ((Diamond[pick].x >= player.x-300) && (Diamond[pick].x <= player.x+300) )){
                game.physics.arcade.moveToObject(rocket,Diamond[pick],700, 500);
                previousNum1 = pick1
                if(source!= 1)
                  rocketTime = game.time.now + 1000;             // add time gap for next rocket
                blaster.play()
            }
            else
              rocket.kill() 
            }

            else if(Diamond[pick1].y<enemythree[pick2].y){
              pick = pick2
              previousNum2 = pick
              if(enemythree[pick].alive && enemythree[pick].y>5&& (enemythree[pick].y < player.y-100) && ((enemythree[pick].x >= player.x-300) && (enemythree[pick].x <= player.x+300) )){
               game.physics.arcade.moveToObject(rocket,enemythree[pick],700, 500);
               previousNum2 = pick2
                if(source!= 1)
                rocketTime = game.time.now + 1000;             // add time gap for next rocket
                 blaster.play()
              }
              else

              rocket.kill() 
            }                                // play rocket sound
            else{ 
              rocket.body.velocity.y = -400;
              if(source!= 1)
                rocketTime = game.time.now + 1000;
            }
          }       
       }
     }
  }
}
  else
    console.log("not enough rockets")
}

// function that detirmines the firing of a bullet of enemy
function EnemyFireBullet (enemyX, i) {
        //  Grab the first bullet we can from the pool
      if(enemyX.y > 6) //shoots only when enemy y pos = 6 
      {  
        Enemybullet = Enemybullets.getFirstExists(false);  //remove bullet from pool

        if (Enemybullet)
        {
            //  Fire
            Enemybullet.reset(enemyX.x, enemyX.y);
            Enemybullet.body.velocity.y = 200;   // speed of the bullet
            EnemybulletTime = game.time.now  + (cc*ROF)/(Mul);
        }
      }

}

// function that detirmines the firing of a bullet of enemy
function Enemy3FireBullet (enemyX, i) {
        //  Grab the first bullet we can from the pool
      if(enemyX.y > 6) //shoots only when enemy y pos = 6 
      {  
        Enemybullet = Enemybullets.getFirstExists(false);  //remove bullet from pool

        if (Enemybullet)
        {
            //  Fire
            if(i==0)
               Enemybullet.reset(enemyX.x - 25, enemyX.y + 30)
            if(i == 1)
               Enemybullet.reset(enemyX.x + 25, enemyX.y + 30)


            game.physics.arcade.moveToObject(Enemybullet,player,120); // make bullet follow player 
            Enemybullet.body.velocity.y = 200;   // speed of the bullet
            EnemybulletTime = game.time.now  + (cc*ROF)/(Mul);
        }
      }
}


function Enemy4FireBullet (enemyX, i) {
        //  Grab the first bullet we can from the pool
      if(enemyX.y > 6) //shoots only when enemy y pos = 6 
      {  
        Enemybullet = Enemybullets.getFirstExists(false);  //remove bullet from pool

        if (Enemybullet)
        {
            //  Fire
            if(i == 0)
               Enemybullet.reset(enemyX.x +50, enemyX.y + 60)
         

            game.physics.arcade.moveToObject(Enemybullet,player,200); // make bullet follow player 
            Enemybullet.body.velocity.y = 100;   // speed of the bullet
            EnemybulletTime = game.time.now  + (cc*ROF)/(Mul);
        }
      }
}

//update hud to red when player is hit
function turnHUDRed()
{
  RightHUD = game.add.sprite(w/2,h-60, 'HUD2')
  RightHUD.scale.setTo(.6,.4)
  RightHUD.anchor.setTo(.5,.5)
  RightHUD.animations.add('Hit', [1,0,1,0,1,0], 3, false)  // animation blue <-> red 
  RightHUD.animations.play('Hit')

}

//update hud to green when player gains life
function turnHUDGreen()
{
  RightHUD = game.add.sprite(w/2,h-60, 'HUD')
  RightHUD.scale.setTo(.6,.4)
  RightHUD.anchor.setTo(.5,.5)
  RightHUD.animations.add('Life+', [1,0,1,0,1,0], 3, false)
  RightHUD.animations.play('Life+')  // play animation
}

//create spanners to collect
function SpawnSpanner()
{
  SPAN = Spanner.getFirstExists(false);
  if (SPAN)
  {
    SPAN.reset(200,50)//rand(30,570), -16);  // random spawn
    SPAN.body.velocity.y = 120;  // set veelocity to match bcakground
   }
}

// create gem1 to collect
function spawngem1()
{

    GEM1 = gem1.getFirstExists(false);
    if (GEM1)
    {
      GEM1.reset(rand(30,570), rand(-1000,-10));  // random spawn
      GEM1.body.velocity.y = 50;  // set veelocity to match background
    }
 
} 

// create gem2 to collect
function spawngem2(loc)
{
  GEM2 = gem2.getFirstExists(false);
    if (GEM2)
    {
      GEM2.reset(loc.x , loc.y);  // random spawn
      GEM2.body.velocity.y = 50;  // set veelocity to match background
    }
  }



// create powerUp1 to collect
function spawnPowerUp1()
{
  console.log("call")
    POW1 = powerUp1.getFirstExists(false);
    if (POW1)
    {
      console.log("called")
      POW1.reset(300, -16);  // random spawn
      POW1.body.velocity.y = 80;  // set veelocity to match bcakground
    }
  }

  // create powerUp2 to collect
function spawnPowerUp2()
{
    POW2 = powerUp2.getFirstExists(false);
    if (POW2)
    {
      POW2.reset(200, -16);  // random spawn
      POW2.body.velocity.y = 100;  // set veelocity to match bcakground
    }
  }

    // create powerUp3 to collect
function spawnPowerUp3()
{
    POW3 = powerUp3.getFirstExists(false);
    if (POW3)
    {
      POW3.reset(569, -16);  // random spawn
      POW3.body.velocity.y = 100;  // set veelocity to match bcakground
    }
  }

// create gem2 to collect
function spawnShield()
{
    SHI = shield.getFirstExists(false);
    if (SHI)
    {
      SHI.reset(345, -16);  // random spawn
      SHI.body.velocity.y = 80;  // set veelocity to match bcakground
    }
  }


//keep track of levels and score and backgrounds
function ScoreUpdate()
{
  if(score<200){
    level = 1
    BBackground[0].visible = true;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD1')

  }
  else if(score >= 200 && score< 300){                    // lvl 2 starts
    level = 2;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD2') 
  }
  else if(score >= 300 && score < 400){              // lvl 3 starts
    level = 3;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD3')  }
  else if(score == 400)
    bossCall1()
  else if(score > 400 && score < 500){              // lvl 4 starts
    level = 4;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD4')
    BBackground[0].visible = false; 
  }
  else if(score >= 500 && score < 600){              // lvl 5 starts
    level = 5;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD5')
    BBackground[0].visible = false; 
  }
  else if(score >= 600 && score < 700){              // lvl 6 starts
    level = 6;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD6')  
    BBackground[0].visible = false; 
  }
    else if(score == 700){
      BBackground[0].visible = false; 
      bossCall2()
  }
  else if(score > 700 && score < 800){              // lvl 7 starts
    level = 7;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD7')
    BBackground[0].visible = false;
    BBackground[1].visible = false;  }
  else if(score >= 800 && score < 900){              // lvl 8 starts
    level = 8;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD8')
    BBackground[0].visible = false;
    BBackground[1].visible = false;
  }
  else if(score >= 900 && score < 1000){              // lvl 9 starts
    level = 9;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD9')
    BBackground[0].visible = false;
    BBackground[1].visible = false;
  }
    else if(score == 1000)
    bossCall3()
  else if(score >= 1000 && score < 1500){              // lvl 10 starts
    level = 10;
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD10')
    BBackground[0].visible = false;
    BBackground[1].visible = false;
    BBackground[2].visible = false;
  }
    else if(score == 1500)
    bossCall4()
  else if(score > 1500 && score < 1510){              // lvl 11 starts
    level = 11
    levelText.text = ' ' + level
    ground.loadTexture('LeftHUD11')
    BBackground[0].visible = false;
    BBackground[1].visible = false;
    BBackground[2].visible = false;
  }
  else if(score >= 1510)                               // game Won
  {
    GameWon()
  }
}

function restartGame()
{
  location.reload()
}


//end game function, called when player lives goes to 0
function EndGame()
{

  menu = game.add.sprite(w/2, h/2, 'GameEnd');   // add sprite
  menu.anchor.setTo(0.5, 0.5);

// Add all relavent stats
  scoreTextEnd = game.add.text(w/2+20,h/2-35, '', { font: '32px Arial', fill: '#fff' })
  levelTextEnd = game.add.text(w/2+25,h/2 +2, '', { font: '32px Arial', fill: '#fff' })
  killTextEnd = game.add.text(w/2-15,h/2+38, '', { font: '32px Arial', fill: '#fff' })
  killTextEnd.text = '' + kill
  scoreTextEnd.text = '' + score
  levelTextEnd.text = '' + level;


// setup for ending game
  RestartButton.onDown.add(restartGame,this)
  RestartButton.inputEnabled = true
  Pbutton.visible = false
  hide(StarFireText,BulletText,RocketText,BulletPowerText,ROFText,ShieldText,spaceGoldText,Buybutton)
  show(RestartText)
  RestartText = "PRESS R TO RESTART THE GAME"
  HighScoreText.visible = true
  HighScoreText.text = "Your HIGHEST SCORE IS : " + localStorage.getItem('HighestScore')
  platforms.visible = false
  scoreText.visible = false
  lifeText.visible = false
  levelText.visible = false
  RightHUD.visible = false
  RightHUD.animations.stop(null, true);
  RightHUD.destroy()
  DeathAudio.play()
  game.paused = true;
}


// game won function, called when player gets a score of 2000
function GameWon()
{
  menu = game.add.sprite(w/2, h/2, 'GameWon');
  menu.anchor.setTo(0.5, 0.5);
  hide(StarFireText,BulletText,RocketText,BulletPowerText,ROFText,ShieldText,spaceGoldText,Buybutton)

// display all relevent stats
  scoreTextEnd = game.add.text(w/2 -30,h/2-35, '', { font: '32px Arial', fill: '#fff' })
  killTextEnd = game.add.text(w/2-30,h/2 +2, '', { font: '32px Arial', fill: '#fff' })
  killTextEnd.text = '' + kill
  scoreTextEnd.text = '' + score

  RestartButton.onDown.add(restartGame,this)
  RestartButton.inputEnabled = true
  RestartText = "PRESS R TO RESTART THE GAME"
  HighScoreText.visible = true

  HighScoreText.text = "Your HIGHEST SCORE IS : " + localStorage.getItem('HighestScore')

//setup for game end
  Pbutton.visible = false
  platforms.visible = false
  scoreText.visible = false
  lifeText.visible = false
  levelText.visible = false
  //RightHUD.animations.stop(null, true);
  RightHUD.destroy()
  game.paused = true;
}


//pause functionality implemented here
function Pausee()
{
  Pbutton = game.add.button(w-50, 28, 'PauseButton', PUpdate, this, 2, 1, 0);  //add pause button
  Pbutton.anchor.setTo(0.5, 0.5);
  Pbutton.scale.setTo(.2,.2)
  Rbutton = game.add.button(w-50, 28, 'ResumeButton', junk , this, 2, 1, 0);   // add resume button
  Rbutton.anchor.setTo(0.5, 0.5);
  Rbutton.scale.setTo(.2,.2)
  Rbutton.visible = false
  game.input.onUp.add(RUpdate, self);  // add click listner
} 

//place holder function, returns nothing
function junk() { return }

//pause update function, used to pause game
function PUpdate() 
{
  game.paused = true   // pause game and show resume button
  Pbutton.visible = false
  Rbutton.visible = true
//  Bbutton.visible = true  // to show buy button
  //show(Buybutton)
}

//Resume update function, used to resume game
function RUpdate(event)
{
  var x1 = w-100, x2 = w,  // define location of resume button
      y1 = 0, y2 = 50
  var x11 = w-165, x12 = w-120,
      y11 = 0 , y12 = 50,

      x21 = 150, x22 = 275,
      y21 = 260 , y22 = 375,

      x31 = 325, x32 = 475,
      y31 = 260 , y32 = 375,

      x41 = 525, x42 = 625,
      y41 = 260 , y42 = 3753



  if((event.x > x11 && event.x < x12 && event.y > y11 && event.y < y12) )  //buy button coordinates
  {
    BuyEnter()
  }

  else if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 )  // if click is in resume button
  {
    ResumeGame()
  }
// Buy Main Menu options
  else if((event.x > x21 && event.x < x22 && event.y > y21 && event.y < y22) && BuyHome.visible ==true)  // if click is in resume button
  {
    BuyWep()
  }

    else if((event.x > x31 && event.x < x32 && event.y > y31 && event.y < y32) && BuyHome.visible ==true )  // if click is in resume button
  {
    BuyShip()
  }

    else if((event.x > x41 && event.x < x42 && event.y > y41 && event.y < y42) && BuyHome.visible ==true )  // if click is in resume button
  {
    BuyPup()
  }


// Buy Wep Menu

  else if((event.x > 260 && event.x < 350 && event.y >y41  && event.y <y42 ) && (BuyWEP.visible ==true))  // if click is in resume button
  {
    console.log("1")
    CannonBase(1)
    spaceGoldText.text = '      ' + spaceGold
  }

    else if((event.x > 360 && event.x < 450 && event.y > y41  && event.y <y42 ) && (BuyWEP.visible ==true) )  // if click is in resume button
  {
    console.log("2")
    CannonBase(2)
    spaceGoldText.text = '      ' + spaceGold
  }

    else if((event.x > 460 && event.x < 550 && event.y >y41  && event.y <y42 ) && (BuyWEP.visible ==true) )  // if click is in resume button
  {
    if(spaceGold>=20){
      RocketNum ++
      spaceGold = spaceGold - 20
      spaceGoldText.text = '      ' + spaceGold
      RocketText.text = ''+ RocketNum
    }
  }
   else if((event.x > 560 && event.x < 650 && event.y >y41  && event.y < y42) && (BuyWEP.visible ==true) )  // if click is in resume button
  {
    console.log("4")
    if(spaceGold>=50){
      StarFire ++
      spaceGold = spaceGold - 50
      spaceGoldText.text = '      ' + spaceGold
      StarFireText.text = '' + StarFire
    }
  }


// buy ship menu
 else  if((event.x > 260 && event.x < 325 && event.y >y41  && event.y <y42 ) && (BuySHIP.visible ==true))  // if click is in resume button
  {
    console.log("5")
    ShipType(1)
    spaceGoldText.text = '      ' + spaceGold
  }

   else  if((event.x > 330 && event.x < 410 && event.y > y41  && event.y <y42 ) && (BuySHIP.visible ==true) )  // if click is in resume button
  {
    console.log("6")
    ShipType(2)
    spaceGoldText.text = '      ' + spaceGold
  }

   else  if((event.x > 420 && event.x < 500 && event.y >y41  && event.y <y42 ) && (BuySHIP.visible ==true) && (BuyHome.visible ==false) )  // if click is in resume button
  {
    console.log("7")
    ShipType(3)
    spaceGoldText.text = '      ' + spaceGold
  }
  else  if((event.x > 510 && event.x < 575 && event.y >y41  && event.y < y42) && (BuySHIP.visible ==true)&& (BuyHome.visible ==false) )  // if click is in resume button
  {
    console.log("8")
    ShipType(4)   
    spaceGoldText.text = '      ' + spaceGold
  } 
  else if((event.x > 580 && event.x < 675 && event.y >y41  && event.y < y42) && (BuySHIP.visible ==true)&& (BuyHome.visible ==false) )  // if click is in resume button
  {
    console.log("9")
    ShipType(5)   
    spaceGoldText.text = '      ' + spaceGold
  }

// buy Power up menu
else if((event.x > 240 && event.x < 350 && event.y >y41  && event.y <y42 ) && (BuyPUP.visible ==true))  // if click is in resume button
  {
    console.log("10")
    BulletUpgrade()
    spaceGoldText.text = '      ' + spaceGold
  }

    else if((event.x > 355 && event.x < 450 && event.y > y41  && event.y <y42 ) && (BuyPUP.visible ==true) )  // if click is in resume button
  {
    console.log("11")
    UpdateROF()
    spaceGoldText.text = '      ' + spaceGold

  }

  else if((event.x > 460 && event.x < 550 && event.y >y41  && event.y <y42 ) && (BuyPUP.visible ==true) )  // if click is in resume button
  {
    console.log("12")
    ParalizeUpdate()     //stop enemies from shooting for few secods
  }
  else  if((event.x > 560 && event.x < 625 && event.y >y41  && event.y < y42) && (BuyPUP.visible ==true) )  // if click is in resume button
  {
    if(spaceGold >= 500){
      spaceGold = spaceGold - 500
      spaceGoldText.text = '      ' + spaceGold
      shieldCount ++
      ShieldText.text = '' + shieldCount
    }
    else
      console.log("not enough star")

  } 

  else if ((event.x > 163 && event.x < 200 && event.y >380  && event.y < 420) && ((BuyPUP.visible ==true) || (BuyWEP.visible == true) || (BuySHIP.visible == true)) && (Backbutton.visible == true) )
 {
    BuyBack()
 }

}

function ParalizeUpdate(){                      // Paralize powerUp update
  if(spaceGold >= 500){
    spaceGold = spaceGold - 500
    spaceGoldText.text = '      ' + spaceGold
    ParalizeCount ++
  }
  else
    console.log("not enough star")
}

var call = 0
function UpdateROF(){                               // Updating ROF and HUD accordingly
  if(spaceGold >= 1000 && currPlayerROF >= 250){
    currPlayerROF -= 75
    spaceGold = spaceGold - 1000
    call ++
    if(call == 1)
        ROFText.text = ' * * '
    else if(call ==2)
        ROFText.text = ' * * * '
    else if(call ==3)
        ROFText.text = ' * * * * '
    else if(call ==4)
        ROFText.text = ' * * * * *'
  }
  else
    console.log("nor enough gold")
}

function BulletUpgrade()                        // bullet upgrade and updating HUD accordingly
{
  if(currBulletType<4 && spaceGold >= 1000){
    currBulletType ++
    spaceGold = spaceGold - 1000
    if(currBulletType == 2)
        BulletText.text = ' * * '
    else if(currBulletType ==3)
        BulletText.text = ' * * * '
    else if(currBulletType ==4)
        BulletText.text = ' * * * * '
  }
  else if(currBulletType >= 4)
    console.log("max bullet")
  else
    console.log("nor enough gold")
}

function ResumeGame()
{
    game.paused = false   //resume game and show pause button
    show(Pbutton,Buybutton)
    hide(BuyHome,BuyPUP,BuySHIP,BuyWEP,Backbutton,Rbutton)
}

function BuyBack()                    // Space shop buy home page
{
  show(BuyHome)
  hide(BuyPUP,BuySHIP,BuyWEP,Backbutton)
}

function BuyEnter()  // Space shop buy home page
{
  game.paused = false
  show(BuyHome,Rbutton)
  hide(Buybutton,Pbutton)
  game.paused = true
}

function BuyExit()  // Space shop 
{
  hide(BuyHome,BuyPUP,BuySHIP,BuyWEP)
  Show(Buybutton)
}

function BuyWep(){    // Space shop buy weapon page
  show(BuyWEP,Backbutton)
  hide(BuyHome,BuyPUP,BuySHIP)
}
function BuyShip(){   // Space shop buy ship page
  show(BuySHIP,Backbutton)
  hide(BuyHome,BuyPUP,BuyWEP)
}
function BuyPup(){      // Space shop buy powerUp page
  show(BuyPUP,Backbutton)
  hide(BuyHome,BuySHIP,BuyWEP)
}

function ShipType(val)    // Space shop buy ship page
{
  if (currShipType >= val)
  {
    console.log("u have the same or better ship")
  }
  else {
    currShipType = val
    if(val==1 && spaceGold >= 200){   // if have ship type 1
      spaceGold -= 200
      MaxLife = 6
      currPlayerROF = 475
      playerSpeed = 300
      CanFireRockets = false;
      CanFireLaser = false;
      life = MaxLife
      lifeText.text = '      ' + life
      player.loadTexture('hero2');
      player.anchor.setTo(0.5,0.5)
      playerShieldImg.scale.setTo(0.33,0.33)

    }
    else if(val ==2 && spaceGold >= 500){     // if have ship type 2
      spaceGold -= 500
      player.loadTexture('hero3');
      MaxLife = 7
      currPlayerROF = 450
      playerSpeed = 350
      CanFireLaser = false;
      CanFireRockets = true;
      life = MaxLife
      lifeText.text = '      ' + life
      player.anchor.setTo(0.5,0.5)
      playerShieldImg.scale.setTo(0.33,0.33)
    }
    else if(val ==3 && spaceGold >= 700){   // // if have ship type 3
      spaceGold -= 700
      player.loadTexture('hero4');
      MaxLife = 8
      currPlayerROF = 425
      playerSpeed = 400
      CanFireRockets = true;
      CanFireLaser = false;
      life = MaxLife
      lifeText.text = '      ' + life
      player.anchor.setTo(0.5,0.5)
      playerShieldImg.scale.setTo(0.33,0.33)
    }
    else if(val ==4 && spaceGold >= 1000){   // // if have ship type 4
      spaceGold -= 1000
      player.loadTexture('hero5');
      MaxLife = 9
      currPlayerROF = 400
      playerSpeed = 450
      CanFireRockets = true;
      CanFireLaser = false;
      life = MaxLife
      lifeText.text = '      ' + life
      player.anchor.setTo(0.5,0.5)
      player.scale.setTo(0.95,0.95)
      playerShieldImg.scale.setTo(0.37,0.37)
    }
    else if(val ==5 && spaceGold >= 2000){    // if have ship type 5
      spaceGold -= 2000
      player.loadTexture('hero6');
      MaxLife = 10
      currPlayerROF = 375
      playerSpeed = 500
      CanFireRockets = true;
      CanFireLaser = true;
      life = MaxLife
      lifeText.text = '      ' + life
      player.anchor.setTo(0.5,0.5)
      playerShieldImg.scale.setTo(0.4,0.4)
      player.scale.setTo(.85,0.85)
    }
    else
      console.log("not enough stars")
  }
}


function CannonBase(val)                  //  Cannon type and updating hud accordingly
{
  if(currCannonType >= val)
  {
        console.log("u habe the same cannon")
  }
  else if(spaceGold>+(val*1000)){
    currCannonType = val
    spaceGold = spaceGold - (val*1000)
    if(val == 1)
        BulletPowerText.text = ' * * '
    else if(val == 2)
        BulletPowerText.text = ' * * * * '
  }
  else
    console.log("not enough star")
}


function show(){                                // hide function when need to hide something on hud
for (var i = 0; i < arguments.length; i++) {
    arguments[i].visible = true

    //console.log("showing")
  }
}

function hide(){                                  // hide function when need to hide something on hud
for (var i = 0; i < arguments.length; i++) {
    arguments[i].visible = false
  }
}