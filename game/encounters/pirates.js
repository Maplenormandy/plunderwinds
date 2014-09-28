
'use strict';
var Encounter = require('./encounter');

// This is prototype code.

var pirateResults = new Array(9);

/**
 * The pirate encounter is a neutral encounter
 * 
 * @constructor
 */
function Pirates() {
  this.effectResults = pirateResults;
  this.titleText = 'Pirates';
  this.soundText = 'piratefx';
}

var p1 = {
  flavorText: 'Angry pirates attack, but you win the battle!',
  outcomes: [
    {
      flavorText: 'Plunder their ship',
      mechanicsText: '-1 stamina, +1 treasure, discard',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 1;
        ship.treasure += 1;
        encounterManager.remove(Pirates);
      }
    },
    {
      flavorText: 'Assert dominance over the seas',
      mechanicsText: '-2 stamina, discard 2 pirates',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 2;
        encounterManager.remove(Pirates, 2);
      }
    },
  ]
};

var p2 = {
  flavorText: 'Angry pirates attack and win!',
  outcomes: [
    {
      flavorText: 'Limp away',
      mechanicsText: '-1 stamina, discard',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 1;
        encounterManager.remove(Pirates);
      }
    },
  ]
};

var p3 = {
  flavorText: 'Friendly pirates!',
  outcomes: [
    {
      flavorText: 'Wave hello and sail away',
      mechanicsText: 'nothing',
      effectFunc: function(ship, encounterManager) {
        // Do nothing
      }
    },
    {
      flavorText: 'Engage!',
      mechanicsText: '-1 stamina, discard',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 1;
        encounterManager.remove(Pirates);
      }
    },
  ]
};

var p4 = {
  flavorText: 'You meet the King of Pirates...',
  outcomes: [
    {
      flavorText: 'Offer tribute',
      mechanicsText: '-1 treasure, discard',
      effectFunc: function(ship, encounterManager) {
        ship.treasure -= 1;
        encounterManager.remove(Pirates);
      }
    },
    {
      flavorText: 'Flee!',
      mechanicsText: '-2 stamina',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 2;
      }
    },
  ]
};

pirateResults[1] = p1;
pirateResults[2] = p2;
pirateResults[3] = p2;
pirateResults[4] = p2;
pirateResults[5] = p3;
pirateResults[6] = p3;
pirateResults[7] = p3;
pirateResults[8] = p4;

Pirates.prototype = new Encounter();
Pirates.prototype.constructor = Pirates;

module.exports = Pirates;
