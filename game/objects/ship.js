'use strict';

var Sprite = require('./sprite');

/**
 * Represents the ship.
 *
 * @constructor
 * @param {Phaser.game} game - The game instance
 * @param {Grid} grid - The grid
 */

function Ship(game, grid) {
  if (typeof game === 'undefined' || typeof grid === 'undefined') {
    throw 'The grid reference should be passed!';
  }
  this.spriteTitle = 'ship';  
  Sprite.call(this, game, 0, 0, this.spriteTitle);
  this.grid = grid;
  grid.ship = this;

  //should not be hardcoded
  this.gridX = 0;
  this.gridY = 0;

  //init position without animation
  this.moveTo(1, false);
  this.moveTo(3, false);

  this.moveTo(1);
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
  return [this.gridY>0, this.gridX<this.grid.spritesX-1, this.gridY<this.grid.spritesX-1, this.gridX>0];
};

/**
 * Moves the ship one cell in the specified direction 
 *
 * @param {Int} dir - 0 - up, 1 - right, 2 - down, 3 - left
 * @param {Boolean} [anim] - should be animated
 */

Ship.prototype.moveTo = function(dir, anim) {
  if (dir < 0 || dir > 4) { return; }
  if (typeof anim === 'undefined') { anim = true; }

  if (!this.canMove()[dir]) { return; }

  var step;
  switch (dir) {
    case 0: step = [0, -1]; break;
    case 1: step = [1, 0]; break;
    case 2: step = [0, 1]; break;
    case 3: step = [-1, 0]; break;
  }

  this.gridX += step[0];
  this.gridY += step[1];

  var absPos = this.absPos();

  if (anim) {
    var move = this.game.add.tween(this.phSprite);
    move.to({x: absPos[0], y: absPos[1]}, 500, Phaser.Easing.Cubic.Out);
    move.start();
  } else {
    this.phSprite.x = absPos[0];
    this.phSprite.y = absPos[1];
  }

  this.grid.updateFog();
};

/**
 * Gets the absolute position in pixels 
 *
 * @returns {Number|Array} [x_pos, y_pos]
 */

Ship.prototype.absPos = function() {
  return [(this.gridX + 0.5) * this.grid.spriteX, (this.gridY + 0.5) * this.grid.spriteX];
};

/**
 * Returns the directions in which the ship can move 
 *
 * @param {Boolean|Array} [(can move up), (right), (down), (left)] 
 */
 
Ship.prototype.canMove = function() {
  return [this.gridY>0, this.gridX<this.grid.spritesX-1, this.gridY<this.grid.spritesX-1, this.gridX>0];
};

module.exports = Ship;