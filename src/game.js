
var game = new Phaser.Game(480, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update })

/**
 * Hi, I'm a well documented function
 */
function preload () {
    game.load.image('logo', '/img/phaser.png');

}

function create () {
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
}

function update() {
}
