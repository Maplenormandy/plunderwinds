
'use strict';
/**
 * This class keeps track of what encounters have occured and hands out new 
 * encounters as necessary
 *
 * @constructor
 * @param {Array} seeds An array of seeds for the rng. Try something like [50]
 */
function EncounterManager(seeds) {
  this.encounters = [];
  this.types = {};
  this.rnd = new Phaser.RandomDataGenerator(seeds);
}

EncounterManager.prototype = {
  /**
   * Randomly chooses the next encounter. Does a draw and replace. Use with
   * remove() to fully remove cards.
   *
   * @return {Encounter} The encounter that occured
   */
  next: function() {
    return this.rnd.pick(this.encounters);
  },

  /**
   * Adds number encounters of type to the deck, i.e. em.add(PirateEncounter, 4)
   *
   * @param {Constructor} type The class of the encounter type to add
   * @param {number} number The number of encounters to add
   */
  add: function(type, number) {
    if (typeof(number) === 'undefined') {
      number = 1;
    }

    for (var i = 0; i < number; ++i) {
      this.encounters.push(new type());
    }
  },

  /**
   * Removes number encounters of type to the deck, i.e. em.remove(PirateEncounter, 4)
   *
   * @param {Constructor} type The class of the encounter type to remove
   * @param {number} number The number of encounters to remove
   * @return {number} The number of encounters actually removed
   */
  remove: function(type, number) {
    if (typeof(number) === 'undefined') {
      number = 1;
    }

    var i = 0;
    for (var j = 0; j < this.encounters.length; ++j) {
      if (this.encounters[j] instanceof type) {
        this.encounters.splice(j, 1);
        ++j;
        ++i;
      }

      if (i >= number) {
        break;
      }
    }

    return i;
  }
};

module.exports = EncounterManager;
