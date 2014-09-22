'use strict';
var Sprite = require('./sprite');
/**
 * Represents a tile class.
 *
 * @constructor
 * @param {Phaser.game} game - The game instance
 * @param {Grid} grid - The grid instance
 * @param {int} [x] - x coordinate.
 * @param {int} [y] - y coordinate.
 * @param {string} key - sprite graphics key
 */

function Tile(game, grid, x, y, key) {
  this.grid = grid;
  Sprite.call(this, game, x, y, key);
  this.phSprite.crop(new Phaser.Rectangle(0, 0, 100, 100), true);
  this.phSprite.inputEnabled = true;
  this.phSprite.events.onInputDown.add(this.onClick, this);

  //should probably be implemented as a transparent sprite instead,
  //but this works for testing
  this.dangerText = this.game.add.text(this.x, this.y, '', 
  	{ font: '40px Helvetica', fill: '#ffffff', align: 'center'});
  this.dangerText.anchor.setTo(0.5);

  this.danger = Math.floor((Math.random() * 8) + 1);
}

//inherit from Sprite
Tile.prototype = new Sprite();
Tile.prototype.constructor = Tile;

Tile.prototype.onClick = function() {
  var angle = Math.atan2(this.game.input.y - this.grid.ship.phSprite.y, this.game.input.x - this.grid.ship.phSprite.x);
  var dir = Math.ceil((angle - Math.PI/4) / (Math.PI/2))+1;
  this.grid.ship.moveTo(dir);
};

Tile.prototype.showDanger = function() {
	this.dangerText.text = this.danger.toString();
};

Tile.prototype.hideDanger = function() {
	this.dangerText.text = '';
};

module.exports = Tile;