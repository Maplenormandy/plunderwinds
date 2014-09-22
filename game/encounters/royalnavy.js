
'use strict';
var Encounter = require('./encounter');

var navyResults = new Array(9);

/**
 * The pirate encounter is a neutral encounter
 * 
 * @constructor
 */
function RoyalNavy() {
  this.effectResults = navyResults;
  this.titleText = 'Royal Navy'
}

var r1 = {
  flavorText: 'Defeated!',
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
  flavorText: 'They didn\'t see you!',
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

var r3 = {
  flavorText: 'Resounding victory, you beat the navy!',
  outcomes: [
    {
      flavorText: 'Claim your spoils',
      mechanicsText: '+2 stamina, +1 treasure',
      effectFunc: function(ship, encounterManager) {
        ship.stamina += 2;
        ship.treasure += 1;
      }
    },
  ]
};

navyResults[1] = r1;
navyResults[2] = r1;
navyResults[3] = r1;
navyResults[4] = r1;
navyResults[5] = r2;
navyResults[6] = r2;
navyResults[7] = r2;
navyResults[8] = r3;

RoyalNavy.prototype = new Encounter();
RoyalNavy.prototype.constructor = RoyalNavy;

module.exports = RoyalNavy;
