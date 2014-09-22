'use strict';
var Tile = require('./tile');

/**
 * Represents a grid.
 *
 * @constructor
 * @param {Phaser.game} game - The game instance
 */

function Grid(game) {
	this.spriteX = 100;
	this.spritesX = 6;
	this.tiles = [];
	this.phGroup = game.add.group();
	this.game = game;
	this.basicTile = 'tile_basic';
	this.constructTilemap();

	// this.ship gets assigned by the ship constructor
	this.ship = null;
}

Grid.prototype.constructTilemap = function () {	
	this.tiles = [];
	for (var i = 0; i < this.spritesX; i++) {
		this.tiles[i] = [];
		for (var j = 0; j < this.spritesX; j++) {
			this.tiles[i][j] = new Tile(this.game, this, (i+0.5)*this.spriteX, (j+0.5)*this.spriteX, this.basicTile);
			this.phGroup.add(this.tiles[i][j].phSprite);
		}
	}
};

Grid.prototype.updateFog = function () {
	var shipX = this.ship.gridX;
	var shipY = this.ship.gridY;

	for (var i = 0; i < this.spritesX; i++) for (var j = 0; j < this.spritesX; j++) {
		//if the distance from tile to ship is small enough
		if ((i-shipX)*(i-shipX) + (j-shipY)*(j-shipY) < 4.1) {
			this.tiles[i][j].showDanger();
		} else {
			this.tiles[i][j].hideDanger();
		}
	}
};

module.exports = Grid;

