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
  },
  movePlayer: function(dir) {
    // Called when the player clicks on a nearby tile. Advance to the next turn,
    // and wait for player input.
    if (this.state == this.STATES.STANDBY) {
      this.state = this.STATES.MOVING;
      // when the ship finishes moving, it triggers the beginEncounter callback
      this.grid.ship.moveTo(dir, true, (function(me) { return me.beginEncounter(me) })(this));
      this.sidePanel.update();
    }
  },
  
  /**
   * A callback function to begin the encounter phase. Calls showResult
   *
   * @param {Play} me this changes based on who calls the function, so hack in
   * a closure.
   */
  beginEncounter: function(me) {
    if (me.state == me.STATES.MOVING) {
      me.state = me.STATES.ENCOUNTER;
      // choose random encounter and remove it from the deck
      var encounter = me.encounterManager.next();
      var tile = me.grid.tiles[me.ship.gridX][me.ship.gridY];
      var result = encounter.getResult(tile.danger);

      me.showResult(result);
    }
  },

  /**
   * Shows the result of the encounter, and presents the player with the choices
   * they can make in response. Calls endEncounter
   *
   * @param {EncounterResult} result The result from an encounter.getResult
   */
  showResult: function(result) {
    console.log(result);
    var outcome = this.game.rnd.pick(result.outcomes);
    this.endEncounter(outcome);
  },

  /**
   * Ends the encounter phase by with the chosen outcome
   *
   * @param {Outcome} outcome The player's decision from result.outcomes
   */
  endEncounter: function(outcome) {
    console.log(outcome);
    outcome.effectFunc(this.ship, this.encounterManager);
    this.state = this.STATES.STANDBY;
  },

  clickListener: function() {
    // This causes init(this) to get called on the gameover state
    // this.game.state.start('gameover', true, false, this);
  }
};

module.exports = Play;
