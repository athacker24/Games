const game = new Phaser.Game(800, 600, Phaser.AUTO, 'Game', {
  preload: preload,
  create: create,
  update: update
})

let score = 0
let life = 5
let level = 1
let scoreText
let platforms
let diamonds
let cursors
let player
let enemy2
let counter = 0
var bulletTime = 0;
var EnemybulletTime = 0;
const Diamond = [];
const BBackground = [];
var background
//var Spanner
//var RedRightHUD
var RightHUD
var j = 0
var Mul = 1
var i= 0
var w = 800, h = 600;



function preload () {

  game.load.image('bullet', 'assets/bullet.png');
  game.load.image('sky1', './assets/bgBlue.png')
  game.load.image('sky4', './assets/bgGreen.png')
  game.load.image('sky3', './assets/bgPurple.png')
  game.load.image('sky2', './assets/bgRed.jpg')
  game.load.image('MiddleHUD', './assets/Cpit1.png')
  game.load.image('enemy1', './assets/enemy.png')
  game.load.image('enemy2', './assets/enemy2.png')  
  game.load.image('hero', './assets/player.png', 32, 32)
  game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
  game.load.spritesheet('HUD', './assets/HUD.png', 240, 200)
  game.load.spritesheet('HUD2', './assets/HUD2.png', 238, 200, 2)
  game.load.spritesheet('SSpanner', './assets/spanner.png',32,32,2)
  game.load.image('Enemybullet', 'assets/Enemybullet.png');
  game.load.image('endGame', 'assets/space2.jpg');
  //game.load.image('diamond', 'assets/sprites/diamond.png');
  game.load.image('menu', './assets/HUD.png', 240, 200);





}

function create () {
  BBackground[0,1,2,3] = game.add.group();
  BBackground[3] = game.add.tileSprite(0, 0, 800, 600, 'sky4')
  BBackground[2] = game.add.tileSprite(0, 0, 800, 600, 'sky3')
  BBackground[1] = game.add.tileSprite(0, 0, 800, 600, 'sky2')
  BBackground[0] = game.add.tileSprite(0, 0, 800, 600, 'sky1') // add background

  game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this); //time counter for checking when to launch waves
  game.physics.startSystem(Phaser.Physics.ARCADE)

//hero bullet creation
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet'); //bulet pool
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 1);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);


//enemy bullets
  Enemybullets = game.add.group();
  Enemybullets.enableBody = true;
  Enemybullets.physicsBodyType = Phaser.Physics.ARCADE;
  Enemybullets.createMultiple(30, 'Enemybullet'); //bullet pool
  Enemybullets.setAll('anchor.x', 0.5);
  Enemybullets.setAll('anchor.y', 1);
  Enemybullets.setAll('outOfBoundsKill', true);
  Enemybullets.setAll('checkWorldBounds', true);

  Enemy1()
 

  player = game.add.sprite(400,game.world.height/1.25, 'hero')
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0
  player.body.gravity.y = 0
  player.body.gravity.x = 0
  player.body.collideWorldBounds = true
  player.animations.add('left' [0, 1],10,true)
  player.animations.add('right' [2, 3],10,true)


  Spanner = game.add.group()
  Spanner.enableBody = true;
  Spanner.physicsBodyType = Phaser.Physics.ARCADE;
  Spanner.createMultiple(1, 'SSpanner');
  //Spanner.animations.add('Span', [1,0], 3, true)
  //SPAN.animations.play('Span') //bullet pool
  Spanner.setAll('anchor.x', 0.5);
  Spanner.setAll('anchor.y', 1);
  Spanner.setAll('outOfBoundsKill', true);
  Spanner.setAll('checkWorldBounds', true);
  //Spanner = game.add.sprite(game.world.width/2 - 145, game.world.height - 290, 'Spanner')
 // Spanner.animations.add('Span', [1,0], 3, true)
  //Spanner.animations.play('Span')
  //


//HUD Background creation
  platforms = game.add.group() //create base platform
  platforms.enableBody = true
  let ground = platforms.create(10, game.world.height - 90, 'MiddleHUD')
  ground.scale.setTo(1.22,.4)
  ground.body.immovable = true

  scoreText = game.add.text(50, game.world.height - 70, '', {fontSize:'25px', fill: 'white'})
  lifeText = game.add.text(300, 16, '', {fontSize:'25px', fill: 'white'})
  lifeText.text = 'Life: ' + life
  scoreText.text = 'Score: ' + score
  cursor = game.input.keyboard.createCursorKeys()
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  startButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

  //Pausee()
}



function update () {

  /*if(startButton)
  {
    game.forceSingleUpdate = false
    game.physics.world.timeScale = 0
    game.time.timeScale = 0
  }*/

  //game.scale = 0;
  //console.log("mul value is : " +Mul)
  ScoreUpdate()  //to check level according to score

  BBackground[3].tilePosition.y += 2;
  BBackground[2].tilePosition.y += 2;
  BBackground[1].tilePosition.y += 2;
  BBackground[0].tilePosition.y += 2;


  Mul = 1 + (0.2*(level-1)); // intensity of game depends on Mul which depends on the level

  //HUDupdate(counter)

  if(counter%(Math.round(20/Mul)) == 0)
    Enemy2()
  if(counter%(Math.round(41/Mul)) == 0)
    Enemy1()
  if(counter%(rand(5,8)) == 0)
    SpawnSpanner()
  //game.physics.arcade.collide(player,platforms)
 // game.physics.arcade.collide(diamonds,platforms)
  game.physics.arcade.overlap(player, diamonds, HitPlayer, null, this)
  game.physics.arcade.overlap(player, enemy2, HitPlayer, null, this)
  game.physics.arcade.overlap(platforms, diamonds, killE1,null, this)
  game.physics.arcade.overlap(bullets, enemy2, collisionHandler, null, this);
  game.physics.arcade.overlap(bullets, diamonds, collisionHandler2, null, this);
  game.physics.arcade.overlap(player, Enemybullets, HurtPlayer, null, this);
  game.physics.arcade.overlap(player, Spanner, AddLife, null, this);
  player.body.velocity.x = 0;

  for(var p = 0; p<j; p++) //for when more than 2 sets of enemiey1 are present in the scene
  {
      game.physics.arcade.overlap(bullets, Diamond[p], collisionHandler2, null, this);
      game.physics.arcade.overlap(player, Diamond[p], HitPlayer, null, this)

  }

  if (fireButton.isDown){
    fireBullet();
  }
  if (cursor.left.isDown) {
    player.body.velocity.x = -250
    player.animations.play('left')
  }
  else if (cursor.right.isDown) {
    player.body.velocity.x = 250
    player.animations.play('right')
  }
  else {
    player.animations.stop()
  }


  if (cursor.down.isDown)// && player.body.touching.down)
  {
      player.body.velocity.y = 250
  }
  else if (cursor.up.isDown)// && player.body.touching.down)
  {
      player.body.velocity.y = -250
  }
   else if (!cursor.up.isDown || !cursor.down.isDown)// && player.body.touching.down)
  {
      player.body.velocity.y = 0
      player.body.velocity.y = 0

  }

  if(game.time.now > EnemybulletTime)  //to randomoze bullets shot by enemy
  {
   var xx = rand(0,Diamond.length-1)
   if(Diamond[xx].alive){
    EnemyFireBullet(Diamond[xx],xx)  //call shoot bullet
  }
  }
}

function updateCounter() {

    counter++;
}

function HitPlayer(player, diamond)
{
  diamond.kill()
  life-=1
  turnHUDRed()
  lifeText.text = 'Life: ' + life

}
function killE1(platforms, diamond)
{
  diamond.kill()
}

function HurtPlayer(player, EnemyBullet)
{
  EnemyBullet.kill()
  life-=1
  turnHUDRed(this)
  lifeText.text = 'Life: ' + life
}

function AddLife(player, spanner)
{
  spanner.kill()
  life+=1
  turnHUDGreen(this)
  lifeText.text = 'Life: ' + life
}

function rand(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
} 

function Enemy1()
{
  //var j
  counter++;
  diamonds = game.add.group()
  diamonds.enableBody = true
  
  for(i = j; i<j+(5*Mul) ; i++)
  {
    Diamond[i] = diamonds.create(rand(70,770),rand(-100,-30),'enemy1') //create enemy
    Diamond[i].body.gravity.y = (100 * Math.random() *0.02) * Mul
    //EnemyFireBullet(Diamond[i], i);
  }
  j=i;  //update total array count

}

function Enemy2()
{
  counter++
  enemy2 = game.add.group()
  enemy2.enableBody = true

  for(var i = 0; i<(5*Mul) ; i++)
  {
    let eenemy2 = enemy2.create(i*rand(70,800/i),-32,'enemy2')
    eenemy2.body.gravity.y = (100000 * Math.random() *0.02) * Mul
  }
}



function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x +14, player.y + 16);
            bullet.body.velocity.y = -400*Mul;
            bulletTime = game.time.now + 200/Mul;
        }
    }

}

function EnemyFireBullet (enemyX, i) {

    //console.log("entering eF  " /*+ enemyX.x + "  " + enemyX.y ,*/+ i)
    //  To avoid them being allowed to fire too fast we set a time limit
  // if (game.time.now > EnemybulletTime)
    //{
      //console.log("i value is :  " + i)
        //  Grab the first bullet we can from the pool
      if(enemyX.y > 6) //shoots only when enemy y pos = 6 
      {  
        Enemybullet = Enemybullets.getFirstExists(false);

        if (Enemybullet)
        {
            //  And fire it
            Enemybullet.reset(enemyX.x +16, enemyX.y + 40);
            Enemybullet.body.velocity.y = 400*(Mul);
            EnemybulletTime = game.time.now  + ((rand(200,500))/(Mul*2));
        }
      }

}


function collisionHandler (bullet, enemy) {

    //  When a bullet hits an alien we kill them both
  bullet.kill();
  if(enemy.y > -10){  //Cant kill enemy befor they are seen
    enemy.kill();
    score+=10
    scoreText.text = 'Score: ' + score
  }
}

function collisionHandler2 (bullet, enemy) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
  if(enemy.y > -10){
    enemy.kill();
    score+=10
    scoreText.text = 'Score: ' + score
  }
}


function turnHUDRed()
{
  RightHUD = game.add.sprite(game.world.width/2 - 145, game.world.height - 90, 'HUD2')
  RightHUD.scale.setTo(.6,.4)
  RightHUD.animations.add('Hit', [1,0,1,0,1,0], 3, false)
  RightHUD.animations.play('Hit')

}
function turnHUDGreen()
{
  RightHUD = game.add.sprite(game.world.width/2 - 145, game.world.height - 90, 'HUD')
  RightHUD.scale.setTo(.6,.4)
  RightHUD.animations.add('Life+', [1,0,1,0,1,0], 3, false)
  RightHUD.animations.play('Life+')
}


function SpawnSpanner()
{
  SPAN = Spanner.getFirstExists(false);
  if (SPAN)
  {
    SPAN.reset(rand(30,570), -16);
    SPAN.body.velocity.y = 120;
   }
}

function ScoreUpdate()
{
  if(score >= 200 && score< 300){
    level = 2;
    i=j=0
  }
  else if(score >= 300 && score < 400){
    level = 3;
  }
  else if(score >= 400 && score < 500){
    level = 4;
    BBackground[0].visible = false; //= game.add.tileSprite(0, 0, 800, 600, 'sky2')
  }
  else if(score >= 500 && score < 600){
    level = 5;
  }
  else if(score >= 600 && score < 700){
    level = 6;
  }
  else if(score >= 700 && score < 800){
    level = 7;
    BBackground[1].visible = false;  }
  else if(score >= 800 && score < 900){
    level = 8;
  }
  else if(score >= 900 && score < 1000){
    level = 9;
  }
  else if(score >= 1000 && score < 1100){
    level = 10;
    BBackground[2].visible = false;
  }
  else if(score >= 1100 && score < 1200){
    level = 11
  }
}

function EndGame()
{
  game.load.image('endGame')
}

function Pausee()
{

  pause_label = game.add.text(w - 100, 20, 'Pause', { font: '14px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    // And finally the method that handels the pause menu
    function unpause(event){
        // Only act if paused
        if(game.paused){
            // Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                y1 = h/2 - 180/2, y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                // Display the choice
                choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    };
}

