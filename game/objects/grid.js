'use strict';

/**
 * Represents a grid.
 *
 * @constructor
 * @param {Phaser.game} The game instance
 * @param {string} Tilemap title
 */



function Grid(game, title) {
	this.spriteX = 50;
	this.spritesX = 7;
	this.tiles = [];
	this.game = game;
	this.phMap = game.add.tilemap();
	this.constructTilemap();

}


Grid.prototype.constructTilemap = function () {	
	this.phMap.create('level', this.spritesX, this.spritesX, this.spriteX, this.spriteX);
	
};


module.exports = Grid;

