var game1 = {
    var: bRmode = null,
    var: timer = null,
    var: total = 0,
    var: timertext = null,
    var: UP = null,
    var: DOWN = null,
    var: LEFT = null,
    var: RIGHT = null,
    var: fireButton = null,
    var: bulletTime = 0,
    var: bullets = null,
    var: prevCamX = 0,
    var: health = 100,
    var: healthText = null,
    var: enemies = null,
    var: enimies = null,
    var: gameActive = true,

    init: function (mode,p1,p2) {
        bRmode = mode;
    },
    preload: function () {
        game.load.spritesheet('player1', './assets/player1.png', 16, 16,);
        game.load.spritesheet('enemy', './assets/enemy.png', 16, 16);
        game.load.spritesheet('bullet', './assets/bullet.png', 8, 8, 8);
        game.load.audio('death', './assets/Death.wav');
    },



    updateCounter: function () {
        total++;
    },


    create: function () {
        gameActive = true;
        health = 100;
        death = game.add.audio('death');
        timertext = game.add.text(80, 80, "TIME: ", { fill: 'white' });
        healthtext = game.add.text(580, 80, "Health: " + health, { fill: 'white' });
        //console.log(test1);
        this.timer = game.time.create(false);
        this.timer.loop(30000, this.update, this);
        this.timer.start();

        game.world.setBounds(0, 0, 1600, 800);
        game.physics.startSystem(Phaser.Physics.Arcade);
        player = game.add.sprite(game.world.randomX, game.world.randomY, 'player1');
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        //cursors = game.input.keyboard.createCursorKeys();

        UP = game.input.keyboard.addKey(Phaser.Keyboard.W);
        DOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
        LEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);
        RIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
        player.body.collideWorldBounds = true;

        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        bullets = game.add.group();
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);

        timertext.fixedToCamera = true;
        healthtext.fixedToCamera = true;

        player.animations.add('left', [0, 1, 2, 3], 0, true);
        player.animations.add('right', [0,1,2,3], true);
        player.animations.add('idleL', [0, 1,], 0, true);

        

        prevCamX = game.camera.x;

        enemies = game.add.group();
        enemies.enableBody = true;
        bullets.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.createEnemies();
        
        
       
    },
    createEnemies: function() {
        for (var i = 0; i < 25; i++) {
            enimies = enemies.create(game.world.randomX, game.world.randomY, 'enemy');
            enimies.animations.add('enemyIdle', [0, 1,2,3,4,5], 20, true);
            //enemies.anchor.setTo(0.5, 0.5);
            enimies.play('enemyIdle');
        }
    },










    update: function () {
        //this.timertext.fixedToCamera = true;
        total = this.timer.duration.toFixed(0);
        if (health <= 0) {
            death.play();
            total = 0;
            if (enterKey.isDown && !gameActive) {
                game.state.start("menu", true, false, 5);
            }
        }
        
        timertext.text = "TIME: " + total;
        healthtext.text = "Health: " + health;
        player.play('left', 16, true);
        
        //console.log(timer);
        if (this.timer.duration.toFixed(0) == 0 &&  health > 0) {
            console.log(24);
            game.state.start("ready", true, false, bRmode, health , 0, 1);

        }


        if (LEFT.isDown) {
            player.x -= 8;
            player.scale.x = -1;
            player.play('left');
        }
        else if (RIGHT.isDown) {
            player.x += 8;
            player.scale.x = 1;
            player.play('right');
        }

        if (UP.isDown) {
            player.y -= 8;
        }
        else if (DOWN.isDown) {
            player.y += 8;
        }

        if (fireButton.isDown) {
            this.fireBullet();
         }

        bullets.forEachAlive(this.updateBullets, this);

        prevCamX = game.camera.x;

        game.physics.arcade.overlap(bullets, enemies, this.collisionHandler, null, this);
        game.physics.arcade.overlap(enemies, player, this.collisionHandler2, null, this);


    },

    collisionHandler: function (bullet, enemy) {
        console.log("HERE");
        bullet.kill();
        enemy.kill();

        health += 10;
        healthtext.text = "Health: " + health;
        console.log(health);
    },
    collisionHandler2: function (player, enemy) {
        console.log("HERE");
        
        enemy.kill();

        health -= 10;
        healthtext.text = "Health: " + health;
        console.log(health);
        if (health == 0) {
            var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            gameOvertext = game.add.text(200, 200, "GAME OVER\nPLAYER 1 KILLED THEMSELVES\nBEFORE PLAYER 2 HAD A CHANCE\n\nPRESS ENTER TO RETURN TO MENU", style);
            gameActive = false;
            gameOvertext.fixedToCamera = true;
            player.kill();
            death.play();
        }
    },


    fireBullet: function(){
        if (game.time.now > bulletTime) {
            bullet = bullets.getFirstDead(true, player.x, player.y, 'bullet');

        }
        bullet.scale.x = player.scale.x;



        bulletTime = game.time.now + 150;
    },
    updateBullets(bullet) {
        var camDelta = game.camera.x - prevCamX;
        bullet.x += camDelta;


        if (bullet.scale.x === 1) {
            bullet.x += 16;

            if (bullet.x > (game.camera.view.right )) {
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
