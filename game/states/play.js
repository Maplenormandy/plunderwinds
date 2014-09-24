'use strict';

var Grid = require('../objects/grid');
var Ship = require('../objects/ship');

var Sidepanel = require('../objects/sidepanel');

var EncounterManager = require('../encounters/encountermanager');
var encounterPopup = require('../encounters/encounterpopup');
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
    // Set the background color to pleasant beige
    this.stage.backgroundColor = "#F1F1D4";

    // The game can be in one of four states
    this.STATES = {
      STANDBY: "wait",
      MOVING: "moving",
      ENCOUNTER: "encounter",
      OVER: "over"
    };
    this.state = this.STATES.STANDBY;
    this.startTime = new Date().getTime();

    // Order is important: grid then ship then side panel
    this.grid = new Grid(this);
    this.ship = new Ship(this);
    this.sidePanel = new Sidepanel(this);

    // the result of an encounter can be shown using the encounterPopup function:
    //
    // encounterPopup(this.game, 
    //   {flavorText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum condimentum arcu.',
    //   descriptionText: 'Maecenas condimentum risus a libero posuere suscipit. +5 lorem ipsum.',
    //   imageKey: 'encounter-image-booty'
    // });

    // Initialize encounters
    this.encounterManager = new EncounterManager([50]);

    this.encounterManager.add(encounters.Pirates, 7);
    this.encounterManager.add(encounters.RoyalNavy, 3);
    this.encounterManager.add(encounters.Treasure, 10);

    this.wind = this.encounterManager.rnd.between(1,4) * 2;
    this.sidePanel.compass.pointTo(this.wind);
  },

  movePlayer: function(dir) {
    // Called when the player clicks on a nearby tile. Advance to the next turn,
    // and wait for player input.
    if (dir == null) {
      return;
    }
    
    if (this.state == this.STATES.STANDBY) {
      var newWind = this.encounterManager.rnd.between(1,4) * 2;
      if (Math.abs(newWind - this.wind) <= 2 || Math.abs(newWind - this.wind) == 6) {
        this.wind = newWind;
        this.sidePanel.compass.pointTo(this.wind);
      }

      this.state = this.STATES.MOVING;
      // when the ship finishes moving, it triggers the beginEncounter callback
      // if it fails to move, call the other callback
      this.ship.moveTo(dir, true,
        (function(me) {
          return function () {
            return me.beginEncounter(me)
          }
        })(this),
        (function(me) {
          return function () {
            return me.failToMove(me)
          }
        })(this)
        );

      this.sidePanel.update();
    }
  },
  
  /**
   * A callback function to begin the encounter phase
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

      console.log(result);
      encounterPopup(me.game, encounter, result, this);
    }
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
    this.sidePanel.update();
    if (this.ship.stamina <= 0 || !this.ship.canMoveAnywhere()) {
      this.game.state.start('gameover', true, false, this);
    }
  },

  failToMove: function(me) {
    //console.log("Fighting the wind!");
    me.state = me.STATES.STANDBY;
    this.sidePanel.update();
    if (this.ship.stamina <= 0) 
      this.game.state.start('gameover', true, false, this);
  },

  clickListener: function() {
    // This causes init(this) to get called on the gameover state
    // this.game.state.start('gameover', true, false, this);
  }
};

module.exports = Play;
