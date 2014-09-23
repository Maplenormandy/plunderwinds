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
    // stamina and gold are attached to game directly for now, but would
    // probably be cleaner on ship or in their own struct.
    this.game.stamina = 20;
    this.game.gold = 0;

    // The game can be in one of four states
    this.STATES = {
      STANDBY: "wait",
      MOVING: "moving",
      ENCOUNTER: "encounter",
      OVER: "over"
    };
    this.state = this.STATES.STANDBY;


    // Order is important: grid then ship then side panel
    this.grid = new Grid(this);
    this.ship = new Ship(this);
    this.sidePanel = new Sidepanel(this);

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
  movePlayer: function(dir) {
    // Called when the player clicks on a nearby tile. Advance to the next turn,
    // and wait for player input.
    if (this.state == this.STATES.STANDBY) {
      this.state = this.STATES.MOVING;
      // when the ship finishes moving, it triggers the beginEncounter callback
      this.grid.ship.moveTo(dir, this.beginEncounter);
      this.game.sidePanel.update();
    }
  },
  beginEncounter: function() {
    if (this.state == this.STATES.MOVING) {
      this.state = this.STATES.ENCOUNTER;
      // choose random encounter and remove it from the deck
      var encounter = this.encounterManager.next();
      this.encounterManager.remove(encounter.constructor);
      encounter.getResult(tile.riskLevel)
    }
  },
  clickListener: function() {
    // This causes init(this) to get called on the gameover state
    // this.game.state.start('gameover', true, false, this);
  }
};

module.exports = Play;
