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
  this.arrow.anchor.setTo(0.5, 1);

  this.direction = 0;

  
}

//inherit from Sprite
Compass.prototype = new Sprite();
Compass.prototype.constructor = Compass;

Compass.prototype.pointTo = function(dir) {
  this.direction = dir;

  var target = (dir % 8)/8*360;
  this.game.add.tween(this.arrow)
  .to({angle: target}, 500, Phaser.Easing.Back.Out)
  .start();
};

module.exports = Compass;