var menu = {
    preload: function () {

    },





    create: function () {
        game.add.text(160, 80, "This is the Main Menu\nPress Enter To Start With Battle Royale", { fill: 'white' });
        game.add.text(160, 160, "Press Shift To Start With out Battle Royale", { fill: 'white' });
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    },







    update: function () {
        if (enterKey.isDown) {
            game.state.start("ready", true, false, true,0,0,0);
        }
        if (shiftKey.isDown) {
            game.state.start("ready", true, false, false,0,0,0);
        }


    }
};
