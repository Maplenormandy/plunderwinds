'use strict';

var Grid = require('../objects/grid');
var Ship = require('../objects/ship');
var Sidepanel = require('../objects/sidepanel');
/**
 * This is the main game state. It's probably overkill to create additional
 * states for different phases of the game, so keep game logic to this state
 *
 * @constructor
 */
function Play() {}

Play.prototype = {
  create: function() {
    this.grid = new Grid(this.game);
    this.ship = new Ship(this.game, this.grid);
    this.sidepanel = new Sidepanel(this.game);
  },
  update: function() {

  },
  clickListener: function() {
    // This causes init(this) to get called on the gameover state
    // this.game.state.start('gameover', true, false, this);
  }
};

module.exports = Play;
