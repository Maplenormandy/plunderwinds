
'use strict';
/**
 * This state runs the main menu
 *
 * @constructor
 */
function Menu() {}

Menu.prototype = {
  instructions: [
"The winds of change are blowing, and the high seas are ripe with dubloons! In\n\
Plunder Winds, you must lead your crew through troubled waters, hunting for\n\
booty and avoiding hazards like hostile pirates and the Royal Navy. Reach safe\n\
harbor, and your journey ends in triumph: you and your crew split your reward.\n\
Run out of stamina, and your story ends adrift in the ocean, as you pray for the\n\
mercy of a passing merchant or surrender to death's sweet relief in the bosom of\n\
the sea.\n\nClick to continue.",

"Move to a tile directly adjacent to you (up/down/left/right) by clicking on it,\n\
or using the arrow keys to navigate. You may travel with the wind for free, or\n\
use stamina to fight through cross winds. But beware: sailing directly against\n\
the wind is impossible, and will cost you stamina without getting you anywhere.\n\
The royal navy is in hot pursuit, so you may not cross your own path.\n\n\
Click to continue.",

"Each section of ocean is marked with a color indicating its risk level. For\n\
example, green waters are friendly, and have a greater chance of reward; waters\n\
marked red are more treacherous. Your goal is a friendly port on the edge of\n\
the map. When you reach it, the game ends, and your score is calculated\n\
based on how much loot you have collected.\n\
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
                                                 align: 'center' });
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
