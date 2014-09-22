
'use strict';
var Encounter = require('./encounter');


/**
 * The treasure encounter is a good encounter
 * 
 * @constructor
 */
function Treasure() {
}

Treasure.prototype = new Encounter();
Treasure.prototype.constructor = Treasure;

module.exports = Treasure;
