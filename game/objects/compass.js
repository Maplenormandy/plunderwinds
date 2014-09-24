'use strict';
var Sprite = require('./sprite');

/*
  A compass object

  has a 'direction' property (0 - 7, 0 - north, increases clockwise)
*/

function Compass(game, x, y) {
  // this.grid = grid;
  this.x = x;
  this.y = y;
  this.game = game;
  Sprite.call(this, game, x, y, 'compass');
  this.phSprite.scale.setTo(0.4, 0.4);

  this.arrow = this.game.add.sprite(this.x, this.y, 'compass_arrow');
  this.arrow.anchor.setTo(0.5, 1.0);
  this.arrow.scale.setTo(0.25, 0.25);

  this.direction = 0;

  
}

//inherit from Sprite
Compass.prototype = new Sprite();
Compass.prototype.constructor = Compass;

Compass.prototype.pointTo = function(dir) {
  var targetAngle = (dir % 8)/8*360;

  // Check if the target angle is to the left or to the right of the current angle
  var target = (((targetAngle - this.arrow.angle + 180) % 360) - 180);
  if (target > 0) {
    target = '+' + target;
  } else {
    target = '' + target;
  }

  this.direction = dir;
  

  this.game.add.tween(this.arrow)
  .to({angle: target}, 1000, Phaser.Easing.Back.Out)
  .start();
};

module.exports = Compass;
