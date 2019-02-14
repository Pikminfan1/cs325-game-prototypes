"use strict";

window.onload = function() {

	
    const game = new Phaser.Game(400, 400, Phaser.AUTO, 'game', {preload: preload, create: create, update: update} );
    
    function preload() {
        game.load.spritesheet("player", "./assets/blocks.png", 16, 16,6);
        game.load.spritesheet("fake", "./assets/blocks.png", 16, 16,6);
		game.load.tilemap("map", "./assets/TileMap3.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.audio('miss','./assets/miss.wav');
        game.load.audio('clear','./assets/clear.wav');
		game.load.image("tiles","./assets/simples_pimples.png");
        game.load.audio('music' ,'./assets/gameMusic.wav');
    }
	

	var cursors;

	var map;
	var player;
    var fake;
    
    
    
    var cooldown;
    var fakeTot = 0;
    var timer = 0;
   
    var fake2;
    var fake3;
    var fake4;
    var fake5;
    var fake6;
    var fake7;
    var fake8;
    var fake9;
    var text;
    var timertext;

    var clear;
    var miss;
    var music;
    var mouseWin;

	
	
    function create() {
		
		// World setup
		game.world.setBounds(0, 0, 400, 400);
		game.physics.startSystem(Phaser.Physics.Arcade);
	    mouseWin = false;
		this.map = game.add.tilemap("map");
        
        this.map.addTilesetImage('finalTile', 'tiles');
        
        miss = game.add.audio('miss');
        clear = game.add.audio('clear');
        music = game.add.audio('music');

        this.ForeGround = this.map.createLayer('ForeGround');
		this.map.setCollisionBetween(0, 2000, true, 'ForeGround');
		this.ForeGround.resizeWorld();
;
        //Player
        player = game.add.sprite(game.world.randomX, game.world.randomY ,'player');
        player.anchor.setTo(0.5,0.5);
        game.physics.enable(player,Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();
        player.body.collideWorldBounds = true;
        player.body.velocity.setTo(50,50);
        //player.body.bounce.setTo(1, 1);

        player.inputEnabled = true;
        player.events.onInputDown.add(listener,this);

        
       
        cooldown = game.time.create(false);
        cooldown.loop(60000,update,this);
        cooldown.start();
        createFake();
        music.play();
        

        text = game.add.text(game.world.centerX-80, game.world.centerY-80, " ", { font: "50px Arial", fill: "#ff0044", align: "center" });
        timertext = game.add.text(100, 20, "test", { font: "18px Arial", fill: "#fff", align: "center" });
        
	
    }
    function listener() {
        text.text = "Mouse\nWins"
        mouseWin = true;
        clear.play();
        cooldown.stop();

    }
    function createFake(){
        fake = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake,Phaser.Physics.ARCADE);
        fake.body.velocity.setTo(50,50);
        fake.body.bounce.setTo(1, 1);
        fake.body.onCollide =  new Phaser.Signal();
        fake.body.onCollide.add(test2,this);
        fake.inputEnabled = true;
        fake.events.onInputDown.add(listener2,this);
        
        

        fake2 = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake2,Phaser.Physics.ARCADE);
        fake2.body.velocity.setTo(50,50);
        fake2.body.bounce.setTo(1, 1);
        fake2.inputEnabled = true;
        fake2.events.onInputDown.add(listener2,this);

        fake3 = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake3,Phaser.Physics.ARCADE);
        fake3.body.velocity.setTo(50,50);
        fake3.body.bounce.setTo(1, 1);
        fake3.inputEnabled = true;
        fake3.events.onInputDown.add(listener2,this);

        fake4 = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake4,Phaser.Physics.ARCADE);
        fake4.body.velocity.setTo(50,50);
        fake4.body.bounce.setTo(1, 1);
        fake4.inputEnabled = true;
        fake4.events.onInputDown.add(listener2,this);

        fake5 = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake5,Phaser.Physics.ARCADE);
        fake5.body.velocity.setTo(50,50);
        fake5.body.bounce.setTo(1, 1);
        fake5.inputEnabled = true;
        fake5.events.onInputDown.add(listener2,this);

        fake6 = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake6,Phaser.Physics.ARCADE);
        fake6.body.velocity.setTo(50,50);
        fake6.body.bounce.setTo(1, 1);
        fake6.inputEnabled = true;
        fake6.events.onInputDown.add(listener2,this);

        fake7 = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake7,Phaser.Physics.ARCADE);
        fake7.body.velocity.setTo(50,50);
        fake7.body.bounce.setTo(1, 1);
        fake7.inputEnabled = true;
        fake7.events.onInputDown.add(listener2,this);

        fake8 = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake8,Phaser.Physics.ARCADE);
        fake8.body.velocity.setTo(50,50);
        fake8.body.bounce.setTo(1, 1);
        fake8.inputEnabled = true;
        fake8.events.onInputDown.add(listener2,this);

        fake9 = game.add.sprite(game.world.randomX, game.world.randomY, 'fake');
        game.physics.enable(fake9,Phaser.Physics.ARCADE);
        fake9.body.velocity.setTo(50,50);
        fake9.body.bounce.setTo(1, 1);
        fake9.inputEnabled = true;
        fake9.events.onInputDown.add(listener2,this);


    }
    function listener2(){

        miss.play();
    }
  


    
    function update() {
        timertext.text = ('Time Remaining: ' + cooldown.duration.toFixed(0));
		
        game.physics.arcade.collide(player, this.ForeGround, test2(player), null, null);

        game.physics.arcade.collide(fake, this.ForeGround, test2(fake), null, null);
       
        game.physics.arcade.collide(fake2, this.ForeGround, test2(fake2), null, null);
       
        game.physics.arcade.collide(fake3, this.ForeGround, test2(fake3), null, null);

        game.physics.arcade.collide(fake4, this.ForeGround, test2(fake4), null, null);

        game.physics.arcade.collide(fake5, this.ForeGround, test2(fake5), null, null);
  
        game.physics.arcade.collide(fake6, this.ForeGround, test2(fake6), null, null);
     
        game.physics.arcade.collide(fake7, this.ForeGround, test2(fake7), null, null);
       
        game.physics.arcade.collide(fake8, this.ForeGround, test2(fake8), null, null);

        game.physics.arcade.collide(fake9, this.ForeGround, test2(fake9), null, null);


        //console.log(cooldown.duration.toFixed(0));
        if (cooldown.duration.toFixed(0) == 0 && !mouseWin){
            cooldown.stop();
            text.text = "Box\nWins"
        }
        if (cursors.left.isDown)
        {
            
            player.body.velocity.x = -50;
            
        }
        if (cursors.right.isDown)
        {
           
            player.body.velocity.x = 50;
            
        }
        if (cursors.up.isDown)
        {
            
             player.body.velocity.y = -50;
            
        }
        if (cursors.down.isDown)
        {
            
            player.body.velocity.y = 50;
            
        }
        
    }
    
    function test2(testItem,testItem2){
        testItem.frame = (testItem.frame + 1) % 6
    }
	
	
};