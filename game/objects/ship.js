'use strict';

var Sprite = require('./sprite');

/**
 * Represents the ship.
 *
 * @constructor
 * @param {Phaser.game} game - The game instance
 * @param {Grid} grid - The grid
 */

function Ship(play) {
  if (typeof play === 'undefined' || typeof play.grid === 'undefined') {
    throw 'The grid reference should be passed!';
  }

  this.spriteTitle = 'ship';  
  
  this.play = play;
  this.game = play.game;
  this.grid = play.grid;
  this.grid.ship = this;

  Sprite.call(this, this.game, 0, 0, this.spriteTitle);

  this.stamina = 20;
  this.treasure = 0;

  // should not be hardcoded
  this.gridX = 2;
  this.gridY = 2;

  // init position without animation
  this.moveTo(1, false);
  //this.moveTo(3, false);

  //this.moveTo(1, false);
}

// Inherits from Sprite
Ship.prototype = new Sprite();
Ship.prototype.constructor = Ship;


/**
 * Returns the directions in which the ship can move 
 *
 * @returns {Boolean|Array} [(can move up), (right), (down), (left)] 
 */

Ship.prototype.canMove = function() {
  if (this.stamina <= 0)
    return [false, false, false, false];

  // check if the target square is inside the grid and if it hasn't been touched yet
  return [
    this.gridY > 0 && !this.grid.tiles[this.gridX][this.gridY-1].playerTouched, 
    this.gridX < this.grid.spritesX-1 && !this.grid.tiles[this.gridX+1][this.gridY].playerTouched, 
    this.gridY < this.grid.spritesX-1 && !this.grid.tiles[this.gridX][this.gridY+1].playerTouched, 
    this.gridX > 0 && !this.grid.tiles[this.gridX-1][this.gridY].playerTouched
  ];
};

/**
 * Returns true if the exists at least one legal move 
 *
 * @returns {Boolean} the exists at least one legal move 
 */

Ship.prototype.canMoveAnywhere = function() {
  var res = this.canMove();
  return (res[0] || res[1] || res[2] || res[3]);
};

/**
 * Moves the ship one cell in the specified direction 
 *
 * @param {Int} dir - 0 = up, 1 = right, 2 = down, 3 = left
 * @param {Boolean} [anim] - should be animated
 */

Ship.prototype.moveTo = function(dir, anim, successCb, failCb) {
  if (dir < 0 || dir > 4 || dir == null) { return; }
  if (typeof anim === 'undefined') { anim = true; }

  if (!this.canMove()[dir]) { return; }

  var step;
  switch (dir) {
    case this.grid.UP: step = [0, -1]; break;
    case this.grid.RIGHT: step = [1, 0]; break;
    case this.grid.DOWN: step = [0, 1]; break;
    case this.grid.LEFT: step = [-1, 0]; break;
  }

  if (anim) {
    // should depend on wind speed
    var staminaCost = 1;

    if (this.play.wind/2 == dir) {
      staminaCost = 0;
    } else if (Math.abs(this.play.wind/2 - dir) == 2) {
      this.stamina -= staminaCost;
      failCb();
      return;
    }

    this.stamina -= staminaCost;

    this.gridX += step[0];
    this.gridY += step[1];

    var absPos = this.absPos();

    var move = this.game.add.tween(this.phSprite);
    move.to({x: absPos[0], y: absPos[1]}, 500, Phaser.Easing.Cubic.Out);
    if (typeof successCb !== 'undefined') {
      move.onComplete.add(successCb);
    }
    move.start();
  } else {
    this.gridX += step[0];
    this.gridY += step[1];

    var absPos = this.absPos();

    this.phSprite.x = absPos[0];
    this.phSprite.y = absPos[1];
  }

  // mark the tile so that we cannot move here again
  this.grid.tiles[this.gridX][this.gridY].mark();

  this.grid.updateFog();
};

/**
 * Gets the absolute position in pixels 
 *
 * @returns {Number|Array} [x_pos, y_pos]
 */

Ship.prototype.absPos = function() {
  return [
    (this.gridX + 0.5) * this.grid.spriteSize, 
    (this.gridY + 0.5) * this.grid.spriteSize
  ];
};

module.exports = Ship;
