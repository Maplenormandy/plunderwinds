'use strict';

/**
 * Represents a class that owns a sprite. Extend this class.
 *
 * @constructor
 * @param {Phaser.game} game - The game instance
 * @param {int} [x] - x coordinate.
 * @param {int} [y] - y coordinate.
 * @param {string} key - sprite graphics key
 */

function Sprite(game, x, y, key) {
  this.x = (typeof x === 'undefined') ? 0 : x;
  this.y = (typeof y === 'undefined') ? 0 : y;
  this.game = game;
  if (typeof game === 'undefined') {
    return;
  }
  this.phSprite = game.add.sprite(this.x, this.y, key);
  this.phSprite.anchor.setTo(0.5, 0.5);
}


module.exports = Sprite;