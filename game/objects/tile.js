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

function Tile(play, grid, x, y, key) {
  this.play = play;
  this.game = play.game;
  this.grid = grid;
  this.playerTouched = false;

  Sprite.call(this, this.game, x, y, key);
/*  this.phSprite.crop(new Phaser.Rectangle(0, 0, 100, 100), true);*/
  this.phSprite.inputEnabled = true;
  this.phSprite.events.onInputOver.add(this.onOver, this);
  this.phSprite.events.onInputDown.add(this.onClick, this);
  this.phSprite.anchor.setTo(0.5, 0.5);
  this.phSprite.scale.setTo(0.5, 0.5);


  //should probably be implemented as a transparent sprite instead,
  //but this works for testing
  //this.dangerText = this.game.add.text(this.x, this.y, '', 
  //	{ font: '40px Helvetica', fill: '#ffffff', align: 'center'});
  //this.dangerText.anchor.setTo(0.5);

  this.danger = this.play.encounterManager.rnd.between(1,8);

  this.revealed = false;
}

// inherit from Sprite
Tile.prototype = new Sprite();
Tile.prototype.constructor = Tile;

Tile.prototype.onClick = function() {
  if (this.play.state !== this.play.STATES.STANDBY) { return; }
  // where is this tile relative to the player? only adjacent tiles count.
  var gridPos = this.grid.getTileCoords(this.phSprite.x, this.phSprite.y); 
  var dx = gridPos.x - this.grid.ship.gridX;
  var dy = gridPos.y - this.grid.ship.gridY;
  var dir = null;

  // figure out which direction (if any) to move. if the tile has been touched
  // already, the player can't move here.
  if (this.playerTouched)
    dir = null;
  else if (dx == 0 && dy == 1)
    dir = this.grid.DOWN;
  else if (dx == 0 && dy == -1)
    dir = this.grid.UP;
  else if (dx == 1 && dy == 0)
    dir = this.grid.RIGHT;
  else if (dx == -1 && dy == 0)
    dir = this.grid.LEFT;
  this.play.movePlayer(dir);
};

Tile.prototype.onOver = function() {
  var newText = ""
  var gridPos = this.grid.getTileCoords(this.phSprite.x, this.phSprite.y); 
  if (this.playerTouched == true) {
    newText = "The Royal Navy knows you have been here, so you can not return.";
  } else if (gridPos.x == 5 && gridPos.y == 5) {
    newText = "Your home base, you have return here at the end.";
  } else if (this.revealed == false) {
    newText = "Your scouts can not see that far ahead, get closer to reveal the tile.";
  } else if (this.danger < 3) {
    newText = "Red tiles are the most dangerous. You will face battles that drain " +
      "stamina but let you control what remains in the deck.";
  } else if (this.danger < 6) { 
    newText = "Blue tiles are neutral. You can rest and regain stamina here.";
  } else if (this.danger < 8) {
    newText = "Green tiles have the best rewards. Treasure abounds here, but your actions " +
      "will attract the attention of pirates and the royal navy, adding them to the deck!";
  } else {
    newText = "Purple tiles are a gamble.";
  }
  this.play.sidePanel.spyDescriptionText.text = newText;
};

Tile.prototype.mark = function() {
  this.playerTouched = true;
};

Tile.prototype.showDanger = function() {
  // If the tile is unavailable, mark with an X for now. TODO: should be
  // graphical.
  //if (this.playerTouched)
  //  this.dangerText.text = '';
  //else 
  //  this.dangerText.text = this.danger.toString();
};

Tile.prototype.hideDanger = function() {
	//this.dangerText.text = '';
};

Tile.prototype.updateDanger = function() {
  if (this.revealed) {
    this.showDanger();
  } else {
    this.hideDanger();
  }
};

module.exports = Tile;
