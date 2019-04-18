var menu = {
    preload: function () {

    },





    create: function () {
        game.add.text(160, 80, "This Pig stole some magic glasses and is \n running from the cops through a thunderstorm", { fill: 'white', align: 'center'});
        
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        

    },







    update: function () {
        if (enterKey.isDown) {
            game.state.start("pigGame", true, false);
        }
        


    }
};
