'use strict';
var Sprite = require('./sprite');

function Compass(game, x, y) {
  // this.grid = grid;
  this.x = x;
  this.y = y;
  this.game = game;
  Sprite.call(this, game, x, y, 'compass');
  // this.phSprite.anchor.setTo(0);
  this.phSprite.scale.setTo(0.4, 0.4);

  this.arrow = this.game.add.sprite(this.x, this.y, 'compass_arrow');
  this.arrow.anchor.setTo(0.5, 1);

  // this.pointTo(4);
  
}

//inherit from Sprite
Compass.prototype = new Sprite();
Compass.prototype.constructor = Compass;

Compass.prototype.pointTo = function(dir) {
  var target = (dir % 8)/8*360;
  this.game.add.tween(this.arrow)
  .to({angle: target}, 500, Phaser.Easing.Back.Out)
  .start();
};

module.exports = Compass;