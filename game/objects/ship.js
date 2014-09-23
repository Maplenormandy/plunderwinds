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
  if (typeof game === 'undefined' || typeof grid === 'undefined') {
    throw 'The grid reference should be passed!';
  }
  this.spriteTitle = 'ship';  
  Sprite.call(this, game, 0, 0, this.spriteTitle);
  this.play = play;
  this.game = play.game;
  this.grid = play.grid;
  grid.ship = this;

  // should not be hardcoded
  this.gridX = 0;
  this.gridY = 0;

  // init position without animation
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
  if (this.game.stamina <= 0)
    return [false, false, false, false];
  return [
    this.gridY > 0, 
    this.gridX < this.grid.spritesX-1, 
    this.gridY < this.grid.spritesX-1, 
    this.gridX > 0
  ];
};

/**
 * Moves the ship one cell in the specified direction 
 *
 * @param {Int} dir - 0 = up, 1 = right, 2 = down, 3 = left
 * @param {Boolean} [anim] - should be animated
 */

Ship.prototype.moveTo = function(dir, anim, callback) {
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

  this.gridX += step[0];
  this.gridY += step[1];

  // should depend on wind speed
  var staminaCost = 1;
  this.game.stamina -= staminaCost;

  var absPos = this.absPos();

  if (anim) {
    var move = this.game.add.tween(this.phSprite);
    move.to({x: absPos[0], y: absPos[1]}, 500, Phaser.Easing.Cubic.Out);
    move.onComplete.add(callback);
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
  return [
    (this.gridX + 0.5) * this.grid.spriteSize, 
    (this.gridY + 0.5) * this.grid.spriteSize
  ];
};

module.exports = Ship;
