'use strict';

var Grid = require('../objects/grid');
var Ship = require('../objects/ship');

var Sidepanel = require('../objects/sidepanel');


var EncounterManager = require('../encounters/encountermanager');
var encounters = {
  Pirates: require('../encounters/pirates'),
  RoyalNavy: require('../encounters/royalnavy'),
  Treasure: require('../encounters/treasure')
};

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

    // Initialize encounters
    this.encounterManager = new EncounterManager([50]);

    this.encounterManager.add(encounters.Pirates, 7);
    this.encounterManager.add(encounters.RoyalNavy, 3);
    this.encounterManager.add(encounters.Treasure, 10);

    // Run a test of the encounter manager. This is purely test code
    // Test random draws
    for (var i = 0; i < 40; ++i) {
      console.log(this.encounterManager.next());
    }
    // Test draw and remove
    for (var j = 0; j < 20; ++j) {
      console.log(this.encounterManager.encounters);
      console.log(this.encounterManager.next());
      this.encounterManager.remove(encounters.Treasure);
    }
  },
  update: function() {

  },
  clickListener: function() {
    // This causes init(this) to get called on the gameover state
    // this.game.state.start('gameover', true, false, this);
  }
};

module.exports = Play;
