 var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', { preload: preload, create: create, update: update });


        function preload() {
            game.load.image('sky', 'assets/bliss.jpg');
            game.load.image('ground', 'assets/platform.png');
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            game.load.image('bullet', 'assets/bullet.png');
            game.load.image('bullet2', 'assets/bullet2.png');
        }

        var platforms;
        var score = 0;
        var scoreText;
        var weapon;
        var fireButton;
        var bullets;
        var bullets2;
        var bulletTime = 0;
        var right;
        var right2;
        var redScore = 0;
        var greenScore = 0;
        var redText;
        var greenText;

        function create() {

            //Initiate and create platforms
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.add.sprite(0, 0, 'sky');
            

            platforms = game.add.group();

            platforms.enableBody = true;

            var ground = platforms.create(((game.world.width * 0.25)) , game.world.height - 64, 'ground');

            ground.scale.setTo(2.4, 2);

            ground.body.immovable = true;

            

            var platform = platforms.create((game.world.width / 24), game.world.height - (game.world.height / 4), 'ground');
            platform.body.immovable = true;

            platform = platforms.create((game.world.width) - (game.world.width / 4), game.world.height - (game.world.height / 4), 'ground');
            platform.body.immovable = true;

            platform = platforms.create((game.world.width * 0.25), game.world.height / 2, 'ground');
            platform.scale.setTo(2.4, 1);
            platform.body.immovable = true;

            platform = platforms.create((game.world.width * 0.75), game.world.height - (game.world.height * 0.75), 'ground');
            platform.scale.setTo(1.2, 1);
            platform.body.immovable = true;

            platform = platforms.create((0), game.world.height - (game.world.height * 0.75), 'ground');
            platform.scale.setTo(1.2, 1);
            platform.body.immovable = true;

           //Create both players
            player = game.add.sprite(32, 0, 'dude');
            player2 = game.add.sprite(64, 0, 'dude');
            player2.tint = 0x008000;
            player.tint = 0xFF0000;
            
           
            game.physics.arcade.enable(player);
            game.physics.arcade.enable(player2);
            
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 1200;
            player.body.collideWorldBounds = true;

            player2.body.bounce.y = 0.2;
            player2.body.gravity.y = 1200;
            player2.body.collideWorldBounds = true;

            //Set animations for both players
            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);

            player2.animations.add('left', [0, 1, 2, 3], 10, true);
            player2.animations.add('right', [5, 6, 7, 8], 10, true);

            cursors = game.input.keyboard.createCursorKeys();


            upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
            fireButton2 = game.input.keyboard.addKey(Phaser.Keyboard.E);
            fireButton = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);


            stars = game.add.group();

            star = game.add.sprite(game.world.randomX, 200, 'star');
            star2 = game.add.sprite(game.world.randomX, 200, 'star');
            star2.tint = 0xAC00AC;
            star.tint = 0x00FFFF;

            game.physics.arcade.enable(star);
            game.physics.arcade.enable(star2);

            
            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(30, 'bullet');
            bullets.setAll('anchor.x', 0.5);
            bullets.setAll('anchor.y', -3);
            bullets.setAll('outOfBoundsKill', true);
            bullets.setAll('checkWorldBounds', true);

            bullets2 = game.add.group();
            bullets2.enableBody = true;
            bullets2.physicsBodyType = Phaser.Physics.ARCADE;
            bullets2.createMultiple(30, 'bullet2');
            bullets2.setAll('anchor.x', 0.5);
            bullets2.setAll('anchor.y', -3);
            bullets2.setAll('outOfBoundsKill', true);
            bullets2.setAll('checkWorldBounds', true);


            redText = game.add.text(game.world.width * 0.25 + 16, game.world.height - 50, 'Red Score: 0', { fontSize: '50px', fill: '#ff0000' });
            greenText = game.add.text(game.world.width * 0.6 + 70, game.world.height - 50, 'Green Score: 0', { fontSize: '50px', fill: '#008000' });
        }

        function update() {
            game.physics.arcade.collide(player, platforms);

            player.body.velocity.x = 0;
            game.physics.arcade.moveToObject(star, player, 250);
            if (cursors.left.isDown) {
                //  Move to the left
                player.body.velocity.x = -300;

                player.animations.play('left');
                right = false;
            }
            else if (cursors.right.isDown) {
                //  Move to the right
                player.body.velocity.x = 300;

                player.animations.play('right');
                right = true;
                
            }
            else {
                //  Stand still
                player.animations.stop();

                player.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if (cursors.up.isDown && player.body.touching.down) {
                player.body.velocity.y = -950;
            }

            game.physics.arcade.collide(player2, platforms);

            player2.body.velocity.x = 0;
            game.physics.arcade.moveToObject(star2, player2, 250);
            if (leftKey.isDown) {
                //  Move to the left
                player2.body.velocity.x = -300;

                player2.animations.play('left');
                right2 = false;
            }
            else if (rightKey.isDown) {
                //  Move to the right
                player2.body.velocity.x = 300;

                player2.animations.play('right');
                right2 = true;
            }
            else {
                //  Stand still
                player2.animations.stop();

                player2.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if (upKey.isDown && player2.body.touching.down) {
                player2.body.velocity.y = -950;
            }


            if (fireButton.isDown && !right) {
                fireBulletL();
            }
            if (fireButton.isDown && right) {
                fireBulletR();
            }
            if (fireButton2.isDown && !right2) {
                fireBulletL2();
            }
            if (fireButton2.isDown && right2) {
                fireBulletR2();
            }

            game.physics.arcade.overlap(player, star, playerDeath, null, this);
            game.physics.arcade.overlap(player2, star2, player2Death, null, this);

            game.physics.arcade.overlap(player, bullets2, player2Score, null, this);
            game.physics.arcade.overlap(player2, bullets, playerScore, null, this);

            game.physics.arcade.overlap(player, star2, playerStar, null, this);
            game.physics.arcade.overlap(player2, star, player2Star, null, this);

        }
        function playerStar() {
             player.x = game.world.randomX;
            redScore += 3;
            
            redText.text = 'Red Score: ' + redScore;
        }
        function player2Star() {
            player2.x = game.world.randomX;
            greenScore += 3;
            greenText.text = 'Green Score: ' + greenScore;
        }
        function playerScore() {
            player2.x = game.world.randomX;
            player2.y = game.world.randomY;
            redScore += 1;
            redText.text = 'Red Score: ' + redScore;
        }
        function player2Score() {
            player.x = game.world.randomX;
            player.y = game.world.randomY;
            greenScore += 1;
            greenText.text = 'Green Score: ' + greenScore;
        }
        function playerDeath() {
            player.x = game.world.randomX;
            player.y = game.world.randomY;
            redScore -= 2;
            redText.text = 'Red Score: ' + redScore;

        }
        function player2Death() {
            player2.x = game.world.randomX;
            player2.y = game.world.randomY;
            greenScore -= 2;
            greenText.text = 'Green Score: ' + greenScore;

        }
        function fireBulletL() {
            
            if (game.time.now > bulletTime) {
                bullet = bullets.getFirstExists(false);
                
                if (bullet) {
                    bullet.reset(player.x, player.y);
                        bullet.body.velocity.x = -400;
                    bulletTime = game.time.now + 200;
                }
            }
        }
        function fireBulletR() {

            if (game.time.now > bulletTime) {
                bullet = bullets.getFirstExists(false);

                if (bullet) {
                    bullet.reset(player.x, player.y)
                    bullet.body.velocity.x = 400;
                    bulletTime = game.time.now + 200;
                }
            }
        }
        function fireBulletL2() {

            if (game.time.now > bulletTime) {
                bullet2 = bullets2.getFirstExists(false);

                if (bullet2) {
                    bullet2.reset(player2.x, player2.y);

                    
                    bullet2.body.velocity.x = -400;
                    bulletTime = game.time.now + 200;
                }
            }
        }
        function fireBulletR2() {

            if (game.time.now > bulletTime) {
                bullet2 = bullets2.getFirstExists(false);

                if (bullet2) {
                    bullet2.reset(player2.x, player2.y)
                    console.log("here");
                    bullet2.body.velocity.x = 400;
                    bulletTime = game.time.now + 200;
                }
            }
        }