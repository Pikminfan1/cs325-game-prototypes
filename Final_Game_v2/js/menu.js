var menu = {
    preload: function () {

    },





    create: function () {
        game.add.text(100, 200, "This Pig stole some magic glasses and is \n running from the cops through a thunderstorm \n\nUse the A and D Keys to move, W to jump and S to clear cloud fog \n Remember, you can't jump when you're clearing the clouds\n\nPress Space to Play VS\nPlayer 2 Controls THE Cloud Cop with the arrow keys\n LEFT and RIGHT move, UP sends out a bolt of lightning and DOWN increases cloud fog\nCloud Cop doesn\'t multitask well and can only do one thing at a time\nIf the Pig can survive, he wins\nChoose wisely when to increase fog, as clearing it adds time to the timer", { fill: 'white', align: 'center'});
        game.stage.backgroundColor = "#4488AA";
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        SpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        

    },







    update: function () {
        if (enterKey.isDown) {
            game.state.start("pigGame", true, false);
        }
        if (SpaceKey.isDown) {
            game.state.start("pigGame2", true, false);
        }
        


    }
};
