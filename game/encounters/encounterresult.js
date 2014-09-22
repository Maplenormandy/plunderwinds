
'use strict';

/**
 * Class for encounter results. Mainly just defines an interface with some
 * helper functions.
 *
 * @constructor
 * @param {string} flavorText The flavor text for the encounter result
 */
function EncounterResult(flavorText) {
  this.flavorText = flavorText;
  this.outcomes = [];
}

/**
 * Internal class for encounter outcomes. Defines the interface for outcomes.
 *
 * @constructor
 * @param {string} flavorText The flavor text for the encounter outcome
 * @param {string} mechanicsText The text that describes the outcome's effects
 * @param {function} effectFunc The function that actually makes the effect
 * happen. Should be function(ship, encounterManager) with no return.
 */
function Outcome(flavorText, mechanicsText, effectFunc) {
  this.flavorText = flavorText;
  this.descriptionText = descriptionText;
  this.effectFunc = effectFunc;
}
