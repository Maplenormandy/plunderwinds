
'use strict';

/**
 * Base class for encounters. Mainly just defines an interface, though there
 * is a default function in here for evaluating how risk affects the outcome
 * through an array of effect functions.
 *
 * @constructor
 */
function Encounter() {
  this.effectResults = new Array(9);
  this.titleText = 'blah';
}

Encounter.prototype = {
  /**
   * Gets the result
   *
   * @param {number} riskLevel The risk level that the result should be
   * @return {EncounterResult} The result of the encounter, accounting for risk
   */
  getResult: function(riskLevel) {
    return this.effectResults[riskLevel];
  }
}

module.exports = Encounter;
