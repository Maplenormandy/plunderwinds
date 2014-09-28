
'use strict';
var Encounter = require('./encounter');

var treasureResults = new Array(9);

/**
 * The treasure encounter is a good encounter
 * 
 * @constructor
 */
function Treasure() {
  this.effectResults = treasureResults;
  this.titleText = 'Treasure';
  this.soundText = 'treasurefx';
}

var t1 = {
  flavorText: 'False Lead!',
  frame: 5,
  outcomes: [
    {
      flavorText: 'Arr',
      mechanicsText: 'nothing',
      effectFunc: function(ship, encounterManager) {
        // Do nothing
      }
    },
  ]
};

var t2 = {
  flavorText: 'Booty!',
  frame: 3,
  outcomes: [
    {
      flavorText: 'Drink a grog!',
      mechanicsText: '+1 gold, remove 1 treasure',
      effectFunc: function(ship, encounterManager) {
        ship.treasure += 1;
        encounterManager.remove(Treasure);
      }
    },
  ]
};

var t3 = {
  flavorText: 'Ancient Treasure!',
  frame: 4,
  outcomes: [
    {
      flavorText: 'Use it',
      mechanicsText: '+3 stamina',
      effectFunc: function(ship, encounterManager) {
        ship.stamina += 3;
      }
    },
    {
      flavorText: 'Sell it',
      mechanicsText: '+1 gold, remove 1 treasure',
      effectFunc: function(ship, encounterManager) {
        ship.treasure += 1;
        encounterManager.remove(Treasure);
      }
    },
  ]
};

var t4 = {
  flavorText: 'Treasure was destroyed in a skirmish...',
  frame: 9,
  outcomes: [
    {
      flavorText: 'Arr',
      mechanicsText: 'remove 1 treasure',
      effectFunc: function(ship, encounterManager) {
        encounterManager.remove(Treasure);
      }
    }
  ]
};

treasureResults[1] = t1;
treasureResults[2] = t1;
treasureResults[3] = t2;
treasureResults[4] = t2;
treasureResults[5] = t2;
treasureResults[6] = t2;
treasureResults[7] = t3;
treasureResults[8] = t4;

Treasure.prototype = new Encounter();
Treasure.prototype.constructor = Treasure;

module.exports = Treasure;
