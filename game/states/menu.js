
'use strict';
/**
 * This state runs the main menu
 *
 * @constructor
 */
function Menu() {}

Menu.prototype = {
  instructions: [
"The winds of change are blowing, and the high seas are ripe with dubloons! In \
Plunder Winds, you must lead your crew through troubled waters, hunting for \
booty and avoiding hazards like hostile pirates and the Royal Navy. Reach safe \
harbor, and your journey ends in triumph: you and your crew split your reward. \
Run out of stamina, and your story ends adrift in the ocean, as you pray for the \
mercy of a passing merchant or surrender to death's sweet relief in the bosom of \
the sea.\n\nClick to continue.",

"Move to a tile directly adjacent to you by clicking on it.\n\
Travel with the wind for free, or use stamina to fight through cross winds.\n\
Sailing directly against the wind is impossible, and will cost you stamina.\n\
Beware, the wind changes after you chose your direction of movement!\n\
Each tile has a different risk level, hover over it to learn more.\n\
The number of encounters left in the sea is shown on the side.\n\
Good luck.\n\nClick to continue."
  ],

  preload: function() {
    
  },
  create: function() {
    // This is boilerplate code.
    var style = { font: '50px IM Fell English SC', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 175, 'pirate');
    this.sprite.scale.setTo(0.5, 0.5);
    this.sprite.anchor.setTo(0.5, 0.5);

    /* this.titleText = this.game.add.text(this.game.world.centerX, 300, 
                                        'Plunder Winds', style); 
    this.titleText.anchor.setTo(0.5, 0.5); */

    this.ins_idx = 0;
    this.instructionsText = this.game.add.text(this.game.world.centerX, 450,
                                               this.instructions[this.ins_idx], 
                                               { font: '18px IM Fell English SC',
                                                 fill: '#ffffff', 
                                                 align: 'center',
                                                 wordWrap: true,
                                                 wordWrapWidth: 600 });
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000,
                                        Phaser.Easing.Linear.NONE, 
                                        true, 0, 1000, true);
    this.wasPointerUp = true;
  },
  update: function() {
    this.wasPointerUp = !this.isPointerDown;
    this.isPointerDown = this.game.input.activePointer.isDown;
    if(this.isPointerDown && this.wasPointerUp) {
      this.ins_idx += 1;

      if (this.ins_idx < this.instructions.length) {
        this.instructionsText.text = this.instructions[this.ins_idx];
      } else {
        this.game.state.start('play');
      }
    }
  }
};

module.exports = Menu;
