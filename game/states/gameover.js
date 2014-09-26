
'use strict';
/**
 * The GameOver state shows the final score and offers the player a chance to play again.
 *
 * @constructor
 */
function GameOver() {}

GameOver.prototype = {
  preload: function () {},

  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.game.stage.backgroundColor = '#000';

    var winString = 'Your plundering has come to an end.\nYou collected ' + this.score + ' gold!';
    if (!this.playerDidWin)
      winString += '\nUnfortunately, you ended at sea,\nand what good is treasure if you\'re not at home?'

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, winString, { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },

  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  },

  init: function(endState) {
    this.score = endState.ship.treasure;
    this.playerDidWin = endState.ship.gridX == 5 && endState.ship.gridY == 5;
    this.elapsedTime = this.time.elapsedSecondsSince(endState.startTime);
  }
};
module.exports = GameOver;
