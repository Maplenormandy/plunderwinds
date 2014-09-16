
'use strict';
/**
 * This is the main game state. It's probably overkill to create additional
 * states for different phases of the game, so keep game logic to this state
 *
 * @constructor
 */
function Play() {}

Play.prototype = {
  create: function() {
    // This is boilerplate code.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
    this.sprite.inputEnabled = true;
    
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1,1);
    this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
    this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

    this.sprite.events.onInputDown.add(this.clickListener, this);

    // Notice how this state can be passed to the gameover screen through the start() function
    this.startTime = this.time.now
  },
  update: function() {

  },
  clickListener: function() {
    // This causes init(this) to get called on the gameover state
    this.game.state.start('gameover', true, false, this);
  }
};

module.exports = Play;
