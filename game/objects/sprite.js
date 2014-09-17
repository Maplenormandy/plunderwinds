'use strict';

/**
 * Represents a class that owns a sprite. Extend this class.
 *
 * @constructor
 * @param {Phaser.game} The game instance
 */

 function Sprite(game, x, y) {
 	x = (typeof x === 'undefined') ? 0 : x;
 	y = (typeof y === 'undefined') ? 0 : y;
	this.game = game;
	this.phSprite = game.add.sprite(x, y);
}


module.exports = Sprite;