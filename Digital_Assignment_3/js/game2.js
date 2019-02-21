var game2 = {
    var: Player1Health = 0,
    var: timer = null,
    var: total = 0,
    var: timertext = null,
    var: fireButton = null,
    var: bulletTime = 0,
    var: bullets = null,
    var: prevCamX = 0,
    var: health2 = 100,
    var: healthText2 = null,
    var: enemies = null,
    var: bRmode = null,
    var: gameActive = true,
    var: pew = null,
    var: death = null,
    var: stars = null,
    init: function (mode,p1health) {
        Player1Health = p1health;
        bRmode = mode;
        console.log(bRmode);
    },
    preload: function () {
        game.load.spritesheet("player2", "./assets/player2.png", 16, 16);
        game.load.spritesheet("enemy", "./assets/enemy.png", 16, 16);
        game.load.spritesheet("bullet", "./assets/bullet2.png", 8, 8, 8);
	game.load.audio('pew', './assets/laser9.mp3');
	game.load.audio('death', './assets/Death.wav');
	game.load.spritesheet('star', './assets/star.png');
    },


    updateCounter: function () {
        total++;
    },

	
	
	
    create: function () {
	stars = game.add.group();
        for(var x = 0; x < 100;x++){
            stars.create(game.world.randomX,game.world.randomY,'star');
        }
        gameActive = true,
	pew = game.add.audio('pew');
	death = game.add.audio('death');
        console.log("Im in game 2")
        health2 = 100;
        timertext = game.add.text(80, 80, "TIME: ", { fill: 'white' });
        healthtext2 = game.add.text(580, 80, "Health: " + health2, { fill: 'white' });
        //console.log(test1);
        this.timer = game.time.create(false);
        this.timer.loop(30000, this.update, this);
        this.timer.start();

        game.world.setBounds(0, 0, 1600, 800);
        game.physics.startSystem(Phaser.Physics.Arcade);
        player2 = game.add.sprite(game.world.randomX, game.world.randomY, 'player2');
        player2.anchor.setTo(0.5, 0.5);
        game.physics.enable(player2, Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();
        player2.body.collideWorldBounds = true;

        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        bullets = game.add.group();
        game.camera.follow(player2, Phaser.Camera.FOLLOW_LOCKON, 0.1);

        timertext.fixedToCamera = true;
        healthtext2.fixedToCamera = true;


        prevCamX = game.camera.x;

        enemies = game.add.group();
        enemies.enableBody = true;
        bullets.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        player2.animations.add('left', [0, 1, 2, 3], 0, true);
        player2.animations.add('right', [0, 1, 2, 3], true);
        this.createEnemies();



    },
    createEnemies: function () {
        for (var i = 0; i < 25; i++) {
            enimies = enemies.create(game.world.randomX, game.world.randomY, 'enemy');
            enimies.animations.add('enemyIdle', [0, 1,2,3,4,5], 20, true);
            //enemies.anchor.setTo(0.5, 0.5);
            enimies.play('enemyIdle');
        }
    },
    collisionHandler2: function (player, enemy) {
        

        enemy.kill();

        health2 -= 10;
        healthtext2.text = "Health: " + health2;
        console.log(health2);

        if (health2 == 0) {
            var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            gameOvertext = game.add.text(200, 200, "GAME OVER\nPLAYER 2 KILLED THEMSELVES\nBEFORE PLAYER 1 HAD A CHANCE\n\nPRESS ENTER TO RETURN TO MENU", style);
            gameActive = false;
            gameOvertext.fixedToCamera = true;
            player2.kill();
	    death.play();
        }
       
    },
    

    
        update: function () {
            //this.timertext.fixedToCamera = true;
            total = this.timer.duration.toFixed(0);
            if (health2 <= 0) {
                total = 0;
                if (enterKey.isDown && !gameActive) {
                    game.state.start("menu", true, false, 5);
                }
            }
            timertext.text = "TIME: " + total;
            healthtext.text = "Health: " + health2;
            //console.log(timer);
            player2.play('left', 16, true);
            if (this.timer.duration.toFixed(0) == 0 && health2 > 0) {
                console.log(health2);
                game.state.start("ready", true, false, bRmode, Player1Health, health2,2);

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

            if (fireButton.isDown) {
                this.fireBullet();
		pew.play();
            }

            bullets.forEachAlive(this.updateBullets, this);

            prevCamX = game.camera.x;

            game.physics.arcade.overlap(bullets, enemies, this.collisionHandler, null, this);
            game.physics.arcade.overlap(enemies, player2, this.collisionHandler2, null, this);


        },

        collisionHandler: function (bullet, enemy) {
            console.log("HERE");
            bullet.kill();
            enemy.kill();

            health2 += 10;
            healthtext2.text = "Health: " + health2;
            console.log(health2);
        },

        fireBullet: function() {
            if (game.time.now > bulletTime) {
                bullet = bullets.getFirstDead(true, player2.x, player2.y, 'bullet');

            }
            bullet.scale.x = player2.scale.x;



            bulletTime = game.time.now + 250;
        },
        updateBullets(bullet) {
            var camDelta = game.camera.x - prevCamX;
            bullet.x += camDelta;


            if (bullet.scale.x === 1) {
                bullet.x += 16;

                if (bullet.x > (game.camera.view.right)) {
                    bullet.kill();
                }
            }
            else {
                bullet.x -= 16;

                if (bullet.x < (game.camera.view.left - 500)) {
                    bullet.kill();
                }
            }
        }
    };
