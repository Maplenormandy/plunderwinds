'use strict';
var Tile = require('./tile');

/**
 * Represents a grid.
 *
 * @constructor
 * @param {Phaser.game} game - The game instance
 */

function Grid(game) {
  // the size of the sprite (squared)
	this.spriteSize = 100;
	this.spritesX = 6;
	this.tiles = [];
	this.phGroup = game.add.group();
	this.game = game;
	this.basicTile = 'tile_basic';
	this.constructTilemap();

  // directional constants for convenience
  this.UP = 0;
  this.RIGHT = 1;
  this.DOWN = 2;
  this.LEFT = 3;

	// this.ship gets assigned by the ship constructor
	this.ship = null;
}

/**
 * Retrieve coordinates in tile space from a position in screen space
 *
 * @param {float} x - the x coordinate in pixels
 * @param {float} y - the y coordinate in pixels
 * @returns {object} - the coordinates into the grid array
 */
Grid.prototype.getTileCoords = function (x, y) {	
  return {
    x: Math.floor(x / this.spriteSize),
    y: Math.floor(y / this.spriteSize)
  }
};

/**
 * Construct the 2D array which stores tiles, and initialize each one
 */
Grid.prototype.constructTilemap = function () {	
	this.tiles = [];

	for (var i = 0; i < this.spritesX; i++) {
		this.tiles[i] = [];

		for (var j = 0; j < this.spritesX; j++) {
      this.tiles[i][j] = new Tile(this.game, this, (i+0.5)*this.spriteSize,
                                  (j+0.5)*this.spriteSize, this.basicTile);
			this.phGroup.add(this.tiles[i][j].phSprite);
		}
	}
};

/** 
 * Update the area of the map which is visible to the player
 */
Grid.prototype.updateFog = function () {
	var shipX = this.ship.gridX;
	var shipY = this.ship.gridY;

	for (var i = 0; i < this.spritesX; i++) for (var j = 0; j < this.spritesX; j++) {
		// if the distance from tile to ship is small enough, reveal it
		if ((i-shipX)*(i-shipX) + (j-shipY)*(j-shipY) < 4.1) {
			this.tiles[i][j].revealed = true;
		}

		// update the grid's danger score
		this.tiles[i][j].updateDanger();
	}
};

module.exports = Grid;

