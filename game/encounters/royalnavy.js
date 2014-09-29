
'use strict';
var Encounter = require('./encounter');
var Pirates = require('./pirates');

var navyResults = new Array(9);

/**
 * The pirate encounter is a neutral encounter
 * 
 * @constructor
 */
function RoyalNavy() {
  this.effectResults = navyResults;
  this.titleText = 'Royal Navy';
  this.soundText = 'navyfx';
}

var r1 = {
  flavorText: 'Defeated!',
  frame: 6,
  outcomes: [
    {
      flavorText: 'Limp away',
      mechanicsText: '-2 stamina',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 2;
      }
    },
  ]
};

var r2 = {
  flavorText: 'Fleet spotted in the distance!',
  frame: 6,
  outcomes: [
    {
      flavorText: 'Create a distraction!',
      mechanicsText: 'add 1 pirate',
      effectFunc: function(ship, encounterManager) {
        encounterManager.add(Pirates);
      }
    },
    {
      flavorText: 'Flee!',
      mechanicsText: '-1 stamina',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 1;
      }
    }
  ]
};

var r3 = {
  flavorText: 'They didn\'t see you!',
  frame: 7,
  outcomes: [
    {
      flavorText: 'Sneak by',
      mechanicsText: 'nothing',
      effectFunc: function(ship, encounterManager) {
        // do nothing
      }
    },
  ]
};

var r4 = {
  flavorText: 'Resounding victory, you beat the navy!',
  frame: 8,
  outcomes: [
    {
      flavorText: 'Claim your spoils, but make the news',
      mechanicsText: '-2 stamina, +1 gold, add 1 royal navy',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 2;
        ship.treasure += 1;
        encounterManager.add(RoyalNavy);
      }
    },
    {
      flavorText: 'Slink away',
      mechanicsText: '-1 stamina',
      effectFunc: function(ship, encounterManager) {
        ship.stamina -= 1;
      }
    },
  ]
};

navyResults[1] = r1;
navyResults[2] = r1;
navyResults[3] = r2;
navyResults[4] = r2;
navyResults[5] = r2;
navyResults[6] = r3;
navyResults[7] = r3;
navyResults[8] = r4;

RoyalNavy.prototype = new Encounter();
RoyalNavy.prototype.constructor = RoyalNavy;

module.exports = RoyalNavy;
