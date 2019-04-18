
var pigGame = {

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
    
    
    init: function () {
    },


    preload: function () {
        game.load.spritesheet('player1', './assets/pigSprites.png', 64, 44);
        game.load.image('test', './assets/diamond.png');
        game.load.image('ground1', './assets/ground.png');
        game.load.image('cloudPlat', './assets/cloudPlat.png');
        game.load.image('cloudLayer', './assets/cloudlayer.png')
        game.load.image('fog', './assets/fog.png');
        game.load.image('cloud', './assets/cloud.webp');
        game.load.image('particle', './assets/particle.png');
        game.load.spritesheet('lightning', './assets/lightningbolt.png',32,32);
        
        //game.load.image('obstacle', './assets/diamond.png');
    },
   
    create: function () {
        score = 0;
        game.stage.backgroundColor = "#4488AA";
        player1 = game.add.sprite(50, 10, 'player1');
        safety = game.add.sprite(50, 90, 'cloudPlat');

        game.physics.enable(safety);
        safety.body.immovable = true;
        safety.body.allowGravity = false;
        safety.tint = 0xADD8E6;
        
     
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(player1);
      
        game.physics.arcade.gravity.y = 1000;
       
       
       
        
        
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
        game.add.sprite(50, 50, 'cloudLayer');
        //game.add.sprite(0, 0, 'fog');
        cloud = game.add.sprite(-200, 0, 'cloud');
        cloud.alpha = 0.0;
        cleanKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        scoretext = game.add.text(1030, 20, "SCORE: " + score, { fill: 'white' });

        emitter = game.add.emitter(0, 0, 100);

        emitter.makeParticles('particle');
        emitter.gravity = 0;

        //game.input.onDown(particleBurst, this);
       
 
        

        
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

    platformSpawner: function () {
        console.log("test");
    },
    
    jump: function (player, tilegroupee) {
        dJumpBool = false;
        //console.log("JUMP");
        player1.animations.play('sit', 3);
        if (cursors.up.isDown) {
            player1.animations.play('walk', 8, true);
            player1.body.velocity.y = -500;
            dJumpBool = true;
            

        }
    },
    doubleJump: function () {
        player1.animations.play('walk', 8, true);
        player1.body.velocity.y = -500;

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
        if (player1.body.y < 0 && score > 0) {
            game.physics.arcade.moveToObject(testThing, player1, 200);
        }
        strikes.add(testThing);
        strikeCheck = game.time.now;
    },

    gameOver: function () {
        game.state.start("menu", true, false);
    },

    


    update: function () {
        scoretext.text = "SCORE: " + score;
        




        

        game.physics.arcade.collide(safety, player1, this.jump);

        
        safety.body.velocity.y += 1;
        if (safety.body.y > 1000) {
            safety.kill();
            
        }
        game.physics.arcade.collide(safety, player1);
        if (player1.body.y > 2000 || player1.body.x < -100) {
            this.gameOver();
        }
        //console.log(game.time.now);
        //console.log(dJumpBool);
        var x = player1.body.velocity.y;
        if (dJumpBool && player1.body.velocity.y > 0) {
            if (cursors.up.isDown) {
                dJumpBool = false;
                this.doubleJump();
            }
            
        }
        console.log(x);
        if (tilegroup.total < 10&&game.time.now - timeCheck > 1000) {
            this.platformCreator();
            
        }
        if (thunderClouds.total < 5 && game.time.now - tCloudCheck > 2000) {
           
            this.thunderCoudSpawner();
        }
        
        tilegroup.forEach(function (tile) {
            game.physics.arcade.collide(tile, player1, this.jump);
            
            if (tile.body.x < -200) {
                tile.kill();
                
            }

            


        }, this);

        thunderClouds.forEach(function (cloud) {
            
            game.physics.arcade.collide(cloud, player1, this.jump);
            if (cloud.body.x < -200) {
                cloud.x = 2000;
                cloud.body.velocity.x = (-1) * (Math.random() * (maxTV - minTV + 1) + minTV);
                score += 10;
            }
            var y = (Math.random() % 100) * 100;

            if (y > 50 && game.time.now - strikeCheck > 1000) {
                this.strike(cloud);
            }



        }, this);

        strikes.forEach(function (bolt) {
            if (bolt.body.y > 1000) {
                bolt.kill();
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
                score += 1;
                cleanAnitime = game.time.now;

                if (game.time.now - cleanAniTime > 5000) {
                    player1.animations.play('clean', 2, true);
                }
                
                
            }

        } else {
            cloud.alpha += 0.001;
           
            if (cursors.up.isDown) {
                if (player1.body.onFloor()) {
                    player1.body.velocity.y = -500;
                }
            }
            game.physics.arcade.collide(player1, strikes, this.gameOver);
            game.physics.arcade.collide(player1, tilegroup, this.jump);
            if (cursors.left.isDown) {
                player1.body.velocity.x = -300;
                player1.scale.x = 1;
                player1.animations.play('walk', 8, true);

            }
            else if (cursors.right.isDown) {
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
