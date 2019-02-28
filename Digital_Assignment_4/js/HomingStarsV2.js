
var HomingStarsV2 = {

    var: player1 = null,
    var: player1Ghost = null,
    var: map = null,
    var: layer = null,
    var: idle = null,
    var: walk = null,
    var: enemy = null,
    var: enemies = null,
    var: isGhost = false,
    var: currentTime = null,
    var: lastSpawnTime = null,
    var: timeUntilSpawn = null,
    var: barks = null,
    var: nextBark = 0,
    var: barkRate = 300,
    var: timer = null,
    var: timertext = null,
    var: ghostIdle = null,
    var: sit = null,
    var: sleep = null,
    var: score = 0,
    var: scoretext = null,
    var: bark = null,
    var: rand = 0,
    var: gameOverText = null,
    val: ghostFloat = null,
    init: function () {
    },


    preload: function () {
        game.load.spritesheet('player1', './assets/dog_sprite_sheetx4.png', 64, 44);
        game.load.spritesheet('player1Ghost', './assets/dog_sprite_sheetx4.png', 64, 44);
        game.load.spritesheet('obstacle', './assets/ghost.png', 20, 18);
        game.load.tilemap('dogMap', './assets/dogMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', './assets/groundtile64x40.png');
        game.load.spritesheet('bark', './assets/bark.png', 128, 64);
        //game.load.image('obstacle', './assets/diamond.png');
    },
   
    create: function () {
        game.stage.backgroundColor = "#4488AA";
        player1 = game.add.sprite(10, 10, 'player1');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(player1);
        game.physics.arcade.gravity.y = 500;
        map = game.add.tilemap('dogMap');
        map.addTilesetImage('groundTile', 'tiles');
        map.setCollisionBetween(0, 1);
        layer = map.createLayer('Tile Layer 1');
        player1Ghost = game.add.sprite(100, 100, 'player1Ghost');
        player1Ghost.tint = 0xffffb2;
        game.physics.enable(player1Ghost);
        player1Ghost.body.allowGravity = false;
        player1Ghost.alpha = 0.0;
        player1.body.bounce.y = 0.2;
        player1.body.linearDamping = 1;
        player1.body.collideWorldBounds = true;
        player1Ghost.body.collideWorldBounds = true;

        walk = player1.animations.add('walk', [0, 1, 2, 3, 4, 5]); //4
        ghostFloat = player1Ghost.animations.add('walk', [0, 1, 2, 3, 4, 5]); //4

        sit = player1.animations.add('sit', [8, 9, 10, 9]); //3
        sleep = player1.animations.add('sleep', [6, 7]); //2
        player1.animations.play('sit', 3, true);

        tween = game.add.tween(player1Ghost);
       
       
        enemies = game.add.group();
        
        cursors = game.input.keyboard.createCursorKeys();
        barks = game.add.group();
        barks.enableBody = true;
        barks.physicsBodyType = Phaser.Physics.ARCADE;
        
        game.physics.enable(barks);
        
        barks.createMultiple(50, 'bark');
        barks.setAll('checkWorldBounds', true);
        barks.setAll('outOfBoundsKill', true);

        timer = 100;
        timertext = game.add.text(50, 130, "ENERGY: " + timer, { fill: 'white' });
        scoretext = game.add.text(1030, 130, "SCORE: " + score, { fill: 'white' });

        enemies.callAll('animations.add', 'animations', 'idle', [0,1,2,3,4,5,6,7,8,9], 24, true);
        enemies.callAll('play', null, 'idle');
        //timer.start();


        
    },
    moveEnemy: function () {


    },
    bark: function () {
        if (game.time.now > nextBark && barks.countDead() > 0) {
            nextBark = game.time.now + barkRate;
            var bark = barks.getFirstDead();
            bark.body.allowGravity = false;
            bark.frame = game.rnd.integerInRange(0, 3);
            game.physics.enable(bark);
            bark.scale.setTo(0.5, 0.5);
            bark.reset(player1.x - 5, player1.y - 10);
            console.log("here");
            game.physics.arcade.moveToPointer(bark, 400);
            
            
            
        }
    },

    barkHandler: function (bark,obj) {
        bark.kill();
        obj.kill();
        timer += 150;
    },



    
    
    update: function () {
        rand = Math.random();
        if (timer <= 0) {
            timer = 0;
            gameOverText = game.add.text(330, 330, "GAME OVER\nPRESS ENTER TO RETURN TO TITLE SCREEN", { fill: 'white', align: 'center' });
            if (enterKey.isDown) {
                isGhost = false;
                game.state.start("menu", true, false);
            }

        }
        if (score < timer) {
            score = timer;
        }
        //var enemySpawner = 
        
        timertext.text = "ENERGY: " +  timer;
        scoretext.text = "SCORE: " + score;
        currentTime = game.time.time;
        game.physics.arcade.overlap(barks, enemies, this.barkHandler, null, this);
        game.physics.arcade.collide(player1, layer);
        enemies.forEach(function (item) {
            if (item.x > player1.x) {
                item.scale.setTo(2, 2);
            } else {
                item.scale.setTo(-2, 2);
            }
            
            game.physics.arcade.moveToObject(item, player1, 200);
            
            //item.y = 50;
        });
        game.physics.arcade.overlap(player1, enemies, this.overlapHandler, null, this);
        if (!isGhost) {
            if (game.input.activePointer.isDown) {
                this.bark();

            }

            if (currentTime - lastSpawnTime > timeUntilSpawn) {
                timeUntilSpawn = Math.random() * 4 / Math.sqrt(score + 1) * 30000;
                lastSpawnTime = currentTime;
                enemies.create(game.world.randomX, game.world.randomY, 'obstacle');
                game.physics.enable(enemies);

            }
            if (player1.body.velocity.x > 0) {

                player1.body.velocity.x -= 15;
            } else {
                if (player1.body.velocity.x < 0) {
                    player1.body.velocity.x += 15;
                }
            }


            if (cursors.up.isDown) {
                if (player1.body.onFloor()) {
                    player1.body.velocity.y = -500;
                }
            }

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

        } else if (timer > 0) {
            {
                player1Ghost.animations.play('walk', 8, true);
                
                timer -= Math.round(score.toString().length-1/100);
                if (player1Ghost.body.velocity.x > 0) {
                    player1Ghost.body.velocity.x -= 15;
                } else {
                    if (player1Ghost.body.velocity.x < 0) {
                        player1Ghost.body.velocity.x += 15;
                    }
                }
                if (player1Ghost.body.velocity.y > 0) {
                    player1Ghost.body.velocity.y -= 15;
                } else {
                    if (player1Ghost.body.velocity.y < 0) {
                        player1Ghost.body.velocity.y += 15;
                    }
                }

                if (cursors.left.isDown) {
                    player1Ghost.body.velocity.x = -400;
                    player1Ghost.scale.x = 1;
                }
                else if (cursors.right.isDown) {
                    player1Ghost.body.velocity.x = 400;
                    player1Ghost.scale.x = -1;
                }
                if (cursors.up.isDown) {
                    player1Ghost.body.velocity.y = -400;
                } else {
                    if (cursors.down.isDown) {
                        player1Ghost.body.velocity.y = 400;
                    }
                }
                game.physics.arcade.overlap(player1, player1Ghost, this.ghostOverlapHandler, null, this);
            }
        }
    },
    overlapHandler: function (player, obj) {
        player1.animations.play('sleep', 2,true);
        
        enemies.callAll('kill');
        
        obj.kill();
        isGhost = true;
        player1.body.velocity.x = 0;
        player1Ghost.x = game.world.randomX;
        player1Ghost.y = game.world.randomY;
        player1Ghost.alpha = 0.7;

    },

    ghostOverlapHandler: function () {
        
        isGhost = false;
        player1Ghost.alpha = 0;


    }
    
};
