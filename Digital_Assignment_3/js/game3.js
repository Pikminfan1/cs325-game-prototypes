var game3 = {

    var: p1health = 0,
    var: p2health = 0,
    var: UP = null,
    var: DOWN = null,
    var: LEFT = null,
    var: RIGHT = null,
    var: firebutton1 = null,
    var: firebutton2 = null,
    var: bullets1 = null,
    var: bullets2 = null,
    var: fire1 = null,
    var: player = null,
    var: player2 = null,
    var: bulletTime = 0,
    var: bulletTime2 = 0,
    var: gameActive = true,
    var: returnKey = null,
    var: bRmode = null,
    var: music = null,
    init: function (mode,p1, p2) {
        p1health = p1;
        p2health = p2;
        bRmode = mode;
        console.log(bRmode);

    },
    preload: function () {
        game.load.spritesheet("player1", "./assets/player1.png", 16, 16, 6);
        game.load.spritesheet("player2", "./assets/player2.png", 16, 16, 6);
        //game.load.spritesheet("enemy", "./Assets/color.png", 16, 16, 6);
        game.load.spritesheet("bullet", "./assets/bullet.png", 8, 8, 8);
        game.load.spritesheet("bullet2", "./assets/bullet2.png", 8, 8, 8);
        game.load.audio('music', './assets/flashman.wav');
    },



	
	
	
    create: function () {
        music = game.add.audio('music');
        gameActive = true,
        music.loopFull(0.1);
        music.loop = true;
        music.play();
        console.log("IM IN GAME 3" + " " + p1health + " " + p2health);

        player1healthtext = game.add.text(80, 80, "Player1 Health : " + p1health, { fill: 'white' });
        player2healthtext = game.add.text(game.width-320, 80, "Player2 Health : " + p2health, { fill: 'white' });
        game.scale.setGameSize(1600, 800);
        game.world.setBounds(0, 0, 1600, 800);

        //Player1
        game.physics.startSystem(Phaser.Physics.Arcade);
        player = game.add.sprite(game.world.randomX, game.world.randomY, 'player1');
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
       // cursors = game.input.keyboard.createCursorKeys();
        UP = game.input.keyboard.addKey(Phaser.Keyboard.W);
        DOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
        LEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);
        RIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
        player.body.collideWorldBounds = true;
        fireButton1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        bullets1 = game.add.group();
        bullets1.enableBody = true;
        bullets1.physicsBodyType = Phaser.Physics.ARCADE;

        //Player2
        player2 = game.add.sprite(game.world.randomX, game.world.randomY, 'player2');
        player2.anchor.setTo(0.5, 0.5);
        game.physics.enable(player2, Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();
        player2.body.collideWorldBounds = true;
        fireButton2 = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        bullets2 = game.add.group();
        bullets2.enableBody = true;
        bullets2.physicsBodyType = Phaser.Physics.ARCADE;


        fire1 = true;
        returnKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        player.animations.add('idle', [0, 1, 2, 3], 0, true);
        player2.animations.add('idle2', [0, 1, 2, 3], 0, true);

    },
    update: function () {
        player.play('idle', 16, true);
        player2.play('idle2', 16, true);
        player2healthtext.x = game.width - 320;
        if (!gameActive) {
            if(enterKey.isDown) {
                game.state.start("menu", true, false, 5);
            }
            //player2healthtext.x = game.width - 320;
        } if (game.width > 800 && bRmode) {
            player2healthtext.x = game.width - 320;
            game.scale.setGameSize(game.width - 0.2, game.height);
            game.world.setBounds(0, 0, game.width - 0.2, game.height);
        }
        player1healthtext.text = "Player1 Health: " + p1health;
        player2healthtext.text = "Player2 Health: " + p2health;

        if (LEFT.isDown) {
            player.x -= 8;
            player.scale.x = -1;
        }
        else if (RIGHT.isDown) {
            player.x += 8;
            player.scale.x = 1;
        }

        if (UP.isDown) {
            player.y -= 8;
        }
        else if (DOWN.isDown) {
            player.y += 8;
        }

        if (cursors.left.isDown) {
            player2.x -= 8;
            player2.scale.x = -1;
        }
        else if (cursors.right.isDown) {
            player2.x += 8;
            player2.scale.x = 1;
        }

        if (cursors.up.isDown) {
            player2.y -= 8;
        }
        else if (cursors.down.isDown) {
            player2.y += 8;
        }

        if (fireButton2.isDown) {
            this.fireBullet2();
        }
        if (fireButton1.isDown&& fire1) {
            this.fireBullet1();
        }
        bullets1.forEachAlive(this.updateBullets, this);
        bullets2.forEachAlive(this.updateBullets2, this);
        game.physics.arcade.overlap(bullets1, player2, this.plShotp2, null, this);
        game.physics.arcade.overlap(bullets2, player, this.p2Shotp1, null, this);
    },
    plShotp2: function (player2,bullet) {
        console.log("P2 WAS SHOT");
        bullet.kill();
        fire1 = true;
        p2health -= 10;
        player2healthtext.text = "Player2 Health: " + p2health;
        if (p2health == 0) {
            player2.kill();
            this.gameOver("PLAYER 1");
        }

    },

    p2Shotp1: function (player,bullet2) {
        console.log("P1 WAS SHOT");
        bullet2.kill();
        fire2 = true;
        p1health -= 10;
        player1healthtext.text = "Player1 Health: " + p1health;
        if (p1health == 0) {
            player.kill();
            this.gameOver("PLAYER 2");
        }
    },
    gameOver: function (player) {
        gameOvertext = game.add.text(200, 200, "GAME OVER\n" + player + "\nWINS!" + "\nPRESS ENTER TO RETURN TO MENU", { fill: 'white' });
        gameActive = false;
    },
    fireBullet1: function () {
        
        if (game.time.now > bulletTime) {
            console.log("FIRE");
            bullet = bullets1.getFirstDead(true, player.x, player.y, 'bullet');

        }
        bullet.scale.x = player.scale.x;

        

        bulletTime = game.time.now + 250;
    },
    updateBullets(bullet) {
        //var camDelta = game.camera.x - prevCamX;
        //bullet.x += camDelta;


        if (bullet.scale.x === 1) {
            bullet.x += 16;
            fire1 = false;
            if (bullet.x > (game.world.width)) {
                bullet.kill();
                fire1 = true;
            }
        }
        else {
            bullet.x -= 16;
            fire1 = false;
            if (bullet.x < (0)) {
                bullet.kill();
                fire1 = true;
            }
        }
    },
    fireBullet2: function () {

        if (game.time.now > bulletTime2) {
            console.log("FIRE");
            bullet2 = bullets2.getFirstDead(true, player2.x, player2.y, 'bullet2');

        }
        bullet2.scale.x = player2.scale.x;



        bulletTime2 = game.time.now + 250;
    },
    updateBullets2(bullet2) {
        //var camDelta = game.camera.x - prevCamX;
        //bullet.x += camDelta;


        if (bullet2.scale.x === 1) {
            bullet2.x += 16;
            fire2 = false;
            if (bullet2.x > (game.world.width)) {
                bullet2.kill();
                fire2 = true;
            }
        }
        else {
            bullet2.x -= 16;
            fire2 = false;
            if (bullet2.x < (0)) {
                bullet2.kill();
                fire2 = true;
            }
        }
    }
    

    };
