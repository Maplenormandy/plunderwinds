
'use strict';
/**
 * This state runs the main menu
 *
 * @constructor
 */
function Menu() {}

Menu.prototype = {
  preload: function() {
    
  },
  create: function() {
    // This is boilerplate code.
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'pirate');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Plunder Winds', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'click to play fun pirate game yes', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.stage.backgroundColor = "#F1F1D4";
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
