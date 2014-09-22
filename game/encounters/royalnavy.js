
'use strict';
var Encounter = require('./encounter');

/**
 * The pirate encounter is a neutral encounter
 * 
 * @constructor
 */
function RoyalNavy() {
}

RoyalNavy.prototype = new Encounter();
RoyalNavy.prototype.constructor = RoyalNavy;

module.exports = RoyalNavy;
