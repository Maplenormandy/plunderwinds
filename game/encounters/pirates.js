
'use strict';
var Encounter = require('./encounter');

// This is prototype code.

/*
var pirateResults = new Array(9);

var p1 = {
  flavorText: 'Angry Pirates!',
  outcomes: [
    {
      flavorText: 'Flee!',
      mechanicsText: '-1 stamina, discard',
      effectFunc: function(playState) {
        // do stuff
      }
    },
  ]
}

var p2 = {
  flavorText: 'Friendly Pirates!',
  outcomes: [
    {
      flavorText: 'Leave be',
      mechanicsText: 'nothing',
      effectFunc: function(playState) {
        // do stuff
      }
    },
    {
      flavorText: 'Engage!',
      mechanicsText: '-1 stamina, discard',
      effectFunc: function(playState) {
        // do stuff
      }
    },
  ]
}
*/

/**
 * The pirate encounter is a neutral encounter
 * 
 * @constructor
 */
function Pirates() {
}

Pirates.prototype = new Encounter();
Pirates.prototype.constructor = Pirates;

module.exports = Pirates;
