
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
  flavorText: 'Angry pirates attack!',
  frame: 0,
  outcomes: [
    {
      flavorText: 'Assert dominance over the seas',
      mechanicsText: '-2 stamina, remove 2 pirates',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 2;
        encounterManager.remove(Pirates, 2);
      }
    },
    {
      flavorText: 'Flee',
      mechanicsText: '-1 stamina',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 1;
      }
    },
  ]
};

var p2 = {
  flavorText: 'Friendly pirates',
  frame: 1,
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
      mechanicsText: '-1 stamina, remove 1 pirate',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 1;
        encounterManager.remove(Pirates);
      }
    },
  ]
};

var p3 = {
  flavorText: 'Injured Pirates ask for help',
  frame: 2,
  outcomes: [
    {
      flavorText: 'Sink their ship',
      mechanicsText: '-1 stamina, remove 1 pirate',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 1;
        encounterManager.remove(Pirates);
      }
    },
    {
      flavorText: 'Sell them aid',
      mechanicsText: '+1 gold, add 2 pirates',
      effectFunc: function(ship, encounterManager) {
        ship.gold += 1;
        encounterManager.add(Pirates, 2);
      }
    },
  ]
};

var p4 = {
  flavorText: 'You meet the King of Pirates...',
  frame: 10,
  outcomes: [
    {
      flavorText: 'Pay tribute',
      mechanicsText: '-1 gold, remove 2 pirates',
      effectFunc: function(ship, encounterManager) {
        ship.treasure -= 1;
        encounterManager.remove(Pirates, 2);
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
pirateResults[2] = p1;
pirateResults[3] = p2;
pirateResults[4] = p2;
pirateResults[5] = p2;
pirateResults[6] = p3;
pirateResults[7] = p3;
pirateResults[8] = p4;

Pirates.prototype = new Encounter();
Pirates.prototype.constructor = Pirates;

module.exports = Pirates;
