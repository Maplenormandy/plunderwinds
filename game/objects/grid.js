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

module.exports = Grid;

