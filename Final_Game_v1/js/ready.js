var ready = {

    var: bRmode = null,
    var: state = 0,
    var: p1 = 0,
    var: p2 = 0,
    var: player,
    init: function (mode,p1h,p2h,status) {
        bRmode = mode;
        p1 = p1h;
        p2 = p2h;
        console.log(p2h);
        state = status;

    },
    preload: function () {

    },






    create: function () {
        if (state == 0) {
            player = "Player 1 is";
        }
        if (state == 1) {
            player = "Player 2 is";
        }
        if (state == 2) {
            player = "Player 1 and Player 2 are";
        }
        player1healthtext = game.add.text(80, 80, "Press Enter if " + player + " Ready", { fill: 'white' });
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    },
    update: function () {
        if (enterKey.isDown) {
            if (state == 0) {
                game.state.start("game1", true, false, true,p1,p2,bRmode);
            }
            if (state == 1) {
                game.state.start("game2", true, false, true, p1, p2, bRmode);
            }
            if (state == 2) {
                game.state.start("game3", true, false, true, p1, p2, bRmode);
            }
        }
    },

};
