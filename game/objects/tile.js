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
  this.game = game;
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


  this.revealed = false;
}

// inherit from Sprite
Tile.prototype = new Sprite();
Tile.prototype.constructor = Tile;

Tile.prototype.onClick = function() {
  // where is this tile relative to the player? only adjacent tiles count.
  var gridPos = this.grid.getTileCoords(this.phSprite.x, this.phSprite.y); 
  var dx = gridPos.x - this.grid.ship.gridX;
  var dy = gridPos.y - this.grid.ship.gridY;
  var dir = null;

  // figure out which direction (if any) to move.
  if (dx == 0 && dy == 1)
    dir = this.grid.DOWN;
  else if (dx == 0 && dy == -1)
    dir = this.grid.UP;
  else if (dx == 1 && dy == 0)
    dir = this.grid.RIGHT;
  else if (dx == -1 && dy == 0)
    dir = this.grid.LEFT;

  this.grid.ship.moveTo(dir);
  this.game.sidePanel.update();
};

Tile.prototype.showDanger = function() {
	this.dangerText.text = this.danger.toString();
};

Tile.prototype.hideDanger = function() {
	this.dangerText.text = '';
};

Tile.prototype.updateDanger = function() {
  if (this.revealed) {
    this.showDanger();
  } else {
    this.hideDanger();
  }
};

module.exports = Tile;
