
var pigGame2 = {

    var: player1 = null,
    var: timeCheck = 0,
    var: tCloudCheck = 0,
    var: strikeCheck = 0,
    var: dJumpcooldown = 300,
    var: dJumpBool = true,
    var: maxFV = 400,
    var: minFV = 200,
    var: maxTV = 200,
    var: minTV = 50,
    var: cleanAniTime = 0,
    var: score = 0,
    var: pigsound1 = null,
    var: pigsound2 = null,
    var: airman = null,
    var: pigDeath = null,
    var: gameOverbool = false,
    var: upkey = null,
    var: downkey = null,
    var: leftkey = null,
    var: rightkey = null,
    var: cloudlayer2 = null,
    var: gameOverTime = 0,
    var: p1win = false,
    

    
    init: function () {
    },


    preload: function () {
        game.load.spritesheet('player1', './assets/pigSprites.png', 64, 44);
        game.load.image('test', './assets/diamond.png');

        game.load.image('cloudPlat', './assets/cloudPlat.png');
        game.load.image('cloudLayer', './assets/cloudlayer.png')
        game.load.image('fog', './assets/fog.png');
        game.load.image('cloud', './assets/cloud.webp');
        game.load.image('particle', './assets/particle.png');
        game.load.spritesheet('lightning', './assets/lightningbolt.png', 32, 32);
        
        game.load.audio('pigsound1', './assets/pigsound1.wav');
        game.load.audio('pigsound2', './assets/pigsound2.wav');
        game.load.audio('pigDeath', './assets/pigdeath.wav');
        game.load.audio('zap', './assets/zap.wav');
        game.load.spritesheet('siren', './assets/policeSiren.png', 32, 32);
        //game.load.image('obstacle', './assets/diamond.png');
    },
   
    create: function () {
        score = 0;
        game.stage.backgroundColor = "#4488AA";
        player1 = game.add.sprite(50, 10, 'player1');
        safety = game.add.sprite(50, 90, 'cloudPlat');
        gameOverbool = false;
        game.physics.enable(safety);
        safety.body.immovable = true;
        safety.body.allowGravity = false;
        safety.tint = 0xADD8E6;
        p1win = false;
     
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(player1);
      
        game.physics.arcade.gravity.y = 1000;
       
        pigsound1 = game.add.audio('pigsound1');
        pigsound2 = game.add.audio('pigsound2');
        pigDeath = game.add.audio('pigDeath');
        zap = game.add.audio('zap');
        
        
        player1.body.bounce.y = 0.05;
        player1.body.linearDamping = 1;
        //player1.body.collideWorldBounds = true;
        

        walk = player1.animations.add('walk', [0, 1, 2, 3, 4, 5]); //4
       

        sit = player1.animations.add('sit', [8, 9, 10, 9]); //3
        sleep = player1.animations.add('clean', [ 7]); //2

        player1.animations.play('sit', 3, true);
        player1.anchor.x = 0.5;
        player1.anchor.y = 0.5;
        tilegroup = game.add.group();
        
        thunderClouds = game.add.group();
        strikes = game.add.group();
        
        
        
                
        cursors = game.input.keyboard.createCursorKeys();
        cloudlayer = game.add.sprite(50, 50, 'cloudLayer');
        //game.add.sprite(0, 0, 'fog');
        cloud = game.add.sprite(-200, 0, 'cloud');
        cloud.alpha = 0.0;

        

        scoretext = game.add.text(1030, 80, "TIME: " + score, { fill: 'white' });

        emitter = game.add.emitter(0, 0, 100);

        emitter.makeParticles('particle');
        emitter.gravity = 0;
        upkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        leftkey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        cleanKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        rightkey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        game.camera.follow(player1);



        cursors = game.input.keyboard.createCursorKeys();
        player2 = game.add.sprite(500, 30, 'cloudPlat');
        siren = game.add.sprite(player2.position.x+50, player2.position.y-28, 'siren');
        flash = siren.animations.add('flash', [0, 1]);
        siren.animations.play('flash', 24, true);
        game.physics.enable(player2);
        player2.body.allowGravity = false;
        player2.tint = 0x878787;
        player2.enableBody = true;
        player2.physicsBodyType = Phaser.Physics.ARCADE;
        player2.collideWorldBounds = true;
        score = 100000;

        
    },
    thunderCoudSpawner: function () {
        thunderCloud = game.add.sprite(2000, 50, 'cloudPlat');
        thunderCloud.tint = 0x878787;
        game.physics.enable(thunderCloud);
        thunderCloud.body.velocity.x = (-1) * (Math.random() * (maxTV - minTV + 1) + minTV);
        thunderCloud.body.allowGravity = false;
        game.physics.arcade.collide(thunderCloud, player1);
        thunderCloud.body.immovable = true;
        thunderClouds.add(thunderCloud);

        tCloudCheck = game.time.now;
    },

    platformCreator: function () {
        var platY = (Math.random() * (700 - 300 + 1) + 300)
        tile = game.add.sprite(1500, platY, 'cloudPlat');
        game.physics.enable(tile);
        tile.body.velocity.x = (-1) * (Math.random() * (maxFV - minFV + 1) + minFV);
        tile.body.allowGravity = false;
        game.physics.arcade.collide(tile, player1);
        tile.body.immovable = true;
        tilegroup.add(tile);
        
        timeCheck = game.time.now;
    },

 
    
    jump: function (player, tilegroupee) {
        dJumpBool = false;
        //console.log("JUMP");
        player1.animations.play('sit', 3);
        if (upkey.isDown) {
            player1.animations.play('walk', 8, true);
            pigsound1.play();
            pigsound1._sound.playbackRate.value = (Math.random() * (1.5 - 0.9) + 0.9).toFixed(2);
            player1.body.velocity.y = -500;
            dJumpBool = true;
            

        }
    },
    doubleJump: function () {
        player1.animations.play('walk', 8, true);
        player1.body.velocity.y = -500;
        pigsound2.play();
        pigsound2._sound.playbackRate.value = (Math.random() * (1.5 - 0.9) + 0.9).toFixed(2);
        emitter.x = player1.body.x +5;
        emitter.y = player1.body.y -5;

        emitter.start(true, 2000, null, 50);
    },


    strike: function (cloud) {
        testThing = game.add.sprite(cloud.body.x, cloud.body.y, 'lightning');
        testThing.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7]);
        testThing.animations.play('flash',60, true);
        game.physics.enable(testThing);
        testThing.body.allowGravity = false;
        game.physics.arcade.collide(testThing, player1);
        testThing.body.immovable = true;
        testThing.body.velocity.x = -70;
        testThing.body.velocity.y = 150;
      //  if (player1.body.y < 0 && score > 0) {
            game.physics.arcade.moveToObject(testThing, player1, 200);
      //  }
        strikes.add(testThing);
        strikeCheck = game.time.now;
        zap.play();
        zap._sound.playbackRate.value = (Math.random() * (1.4 - 1.0) + 1.0).toFixed(2);
        
    },

    gameOver: function () {
        

        if (!p1win) {
            player1.kill();
            pigDeath.play();
        }
        gameOverbool = true;
        gameOverTime = game.time.now;
    },

    


    update: function () {
        siren.position.x = player2.position.x+50;
        siren.position.y = player2.position.y - 28;
        if (score == 0 && !gameOverbool) {
            p1win = true;
            this.gameOver();
        }
        if (gameOverbool) {
            scoretext = "TIME: 0";
            if (p1win) {
                gameOverText = game.add.text(330, 330, "PIG WINS!\nGAME OVER\nPRESS ENTER / SPACE TO RETURN TO TITLE SCREEN\n...or wait 10 seconds", { fill: 'white', align: 'center' });
            } else {
                gameOverText = game.add.text(330, 330, "COP CLOUD WINS!\nGAME OVER\nPRESS ENTER TO RETURN TO TITLE SCREEN\n...or wait 10 seconds", { fill: 'white', align: 'center' });
            }
            if (enterKey.isDown || SpaceKey.isDown) {
                game.state.start("menu", true, false);
            }

            if (game.time.now - gameOverTime > 10000) {

                game.state.start("menu", true, false);
            }
        }
        if (cursors.down.isDown) {
            if (cloud.alpha != 1.0) {
                cloud.alpha += 0.0005;
            }
            player2.tint = 0xbf00ff;
        } else {
            if (cursors.up.isDown) {
                if (game.time.now - strikeCheck > 700) {
                    this.strike(player2);
                }
            }
            if (cursors.left.isDown) {
                player2.position.x -= 5;
                siren.position.x = player2.position.x + 50;
                siren.position.y = player2.position.y - 28;
            } else {


                if (cursors.right.isDown) {
                    player2.position.x += 5;
                    siren.position.x = player2.position.x + 50;
                    siren.position.y = player2.position.y - 28;
                } else {

                }
            }
            player2.tint = 0x878787;
        }

        cloudlayer.position.x -= 1;
        if (cloudlayer.position.x < -1000 && cloudlayer2 == null) {
            cloudlayer2 = game.add.sprite(1500, 50, 'cloudLayer');
        }
        if (cloudlayer2 != null) {
            cloudlayer2.position.x -= 1;
            if (cloudlayer2.position.x == -1000) {
                cloudlayer.position.x = 1500;
            }
            if (cloudlayer.position.x == -1000) {
                cloudlayer2.position.x = 1500;
            }
        }

        score--;
        scoretext.text = "TIME: " + score;
        game.physics.arcade.collide(safety, player1, this.jump);

        
        safety.body.velocity.y += 1;
        if (safety.body.y > 1000) {
            safety.kill();
            
        }
        game.physics.arcade.collide(safety, player1);

        if ((player1.body.y > 2000 || player1.body.x < -100) && !gameOverbool && !p1win) {
           
            this.gameOver();

        }

        var x = player1.body.velocity.y;
        if (dJumpBool && player1.body.velocity.y > 0) {
            if (upkey.isDown) {
                dJumpBool = false;
                this.doubleJump();
            }
            
        }

        if (tilegroup.total < 10&&game.time.now - timeCheck > 1000) {
            this.platformCreator();
            
        }

        
        tilegroup.forEach(function (tile) {
            game.physics.arcade.collide(tile, player1, this.jump);
            
            if (tile.body.x < -200) {
                tilegroup.remove(tile);
                tile.destroy();
                
            }

            


        }, this);

        

        strikes.forEach(function (bolt) {
            if (bolt.body.y > 1000) {
                bolt.destroy();
            }
            
        })
        
       
        if (player1.body.velocity.x > 0) {

            player1.body.velocity.x -= 25;
        } else {
            if (player1.body.velocity.x < 0) {
                player1.body.velocity.x += 25;
            }
        }
        if (cleanKey.isDown) {
            if (cloud.alpha - 0.005 > 0) {
                cloud.alpha -= 0.005;
                if (!gameOverbool) {
                    score += 3;
                }
                cleanAnitime = game.time.now;

                if (game.time.now - cleanAniTime > 5000) {
                    player1.animations.play('clean', 2, true);
                }
                
                
            }

        } else {
           
            if (upkey.isDown) {
                if (player1.body.onFloor()) {
                    player1.body.velocity.y = -500;
                }
            }
            game.physics.arcade.collide(player1, strikes, this.gameOver);
            game.physics.arcade.collide(player1, tilegroup, this.jump);
            if (leftkey.isDown) {
                player1.body.velocity.x = -300;
                player1.scale.x = 1;
                player1.animations.play('walk', 8, true);

            }
            else if (rightkey.isDown) {
                player1.body.velocity.x = 300;
                player1.scale.x = -1;
                player1.animations.play('walk', 8, true);
            } else {
                if (player1.body.onFloor()) {
                    player1.animations.play('sit', 3);

                }
            }
        }


    }
    
};
