var menu = {
    preload: function () {

    },





    create: function () {
        game.add.text(230, 280, "This Pig stole some magic glasses and is \n running from the cops through a thunderstorm \n\nUse the A and D Keys to move, W to jump and S to clear clouds \n Remember, you can't jump when you're clearing the clouds", { fill: 'white', align: 'center'});
        game.stage.backgroundColor = "#4488AA";
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        

    },







    update: function () {
        if (enterKey.isDown) {
            game.state.start("pigGame", true, false);
        }
        


    }
};
