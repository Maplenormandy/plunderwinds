'use strict';

/**
 * Represents a bonus granted at the end of the game.
 *
 * @constructor
 * @param {function} checker - Is called on a game instance, and returns a string if the bonus should be applied, false otherise.
 * @param {function} scoreModifier - Is called on a score, and returns the new score.
 */

function Bonus(checker, scoreModifier) {
  this.checker = checker;
  this.scoreModifier = scoreModifier;
}

module.exports = Bonus;
