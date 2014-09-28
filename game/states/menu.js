
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
    var style = { font: '50px IM Fell English SC', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 175, 'pirate');
    this.sprite.scale.setTo(0.5, 0.5);
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 350, 'Instructions', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 475, "You are a pirate, and your goal is to maximize gold. \nyou must also sail to the goal tile before running out of stamina.\n \nClick on an adjacent tile you've never been to before to move there.\nMovement opposing the wind (green arrow in lower right) is prohibited,\nand movement not with the wind costs stamina.\n\n green tiles are generally good, red tiles are generally bad. \npurple is really good or really bad. blue is neutral. \n \n the deck counter on the side helps you track the probabilities of each encounter.", { font: '16px IM Fell English SC', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
