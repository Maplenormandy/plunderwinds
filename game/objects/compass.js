'use strict';
var Sprite = require('./sprite');

/*
  A compass object

  has a 'direction' property (0 - 7, 0 - north, increases clockwise)
*/

function Compass(game, panel, x, y) {
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

  this.clouds = [];
  // the number of clouds on the screen
  this.cloudNum = 10;
  this.cloudAlpha = 0.5;
  this.cloudScale = 0.2;
  this.windV = [0, 0];
  this.targetWindV = [0, 0];

  this.setupClouds();
  this.setWindEmitterDirection(2, true);

  // this.panel.group.bringToTop();
}

//inherit from Sprite
Compass.prototype = new Sprite();
Compass.prototype.constructor = Compass;

Compass.prototype.setupClouds = function() {
  var dist = [[Math.random() * 600, Math.random() * 600]];

  for (var a = 0; a < this.cloudNum; a++) {
    var point = randomSample(dist, 600, 600);
    // if (typeof point === 'undefined') continue;
    dist.push(point);
    var cloud = this.game.add.sprite(point[0], point[1], 'pirate');
    cloud.anchor.setTo(0.5);
    cloud.scale.setTo(this.cloudScale, this.cloudScale);
    cloud.alpha = this.cloudAlpha;
    this.clouds.push(cloud);
  }
};

Compass.prototype.updateClouds = function() {
  var e;

  this.windV[0] += (this.targetWindV[0] - this.windV[0]) * 0.015;
  this.windV[1] += (this.targetWindV[1] - this.windV[1]) * 0.015;

  for (var a = 0; a < this.clouds.length; a++) {
    e = this.clouds[a];
    e.x += this.game.time.elapsed * this.windV[0] / 1000.0;
    e.y += this.game.time.elapsed * this.windV[1] / 1000.0;

    if (e.x > 620) { e.x = (e.x - 20) % 600 - 20; }
    if (e.y > 620) { e.y = (e.y - 20) % 600 - 20; }
  }
};

Compass.prototype.setWindEmitterDirection = function (dir, direct) {
  if (typeof direct === 'undefined') { direct = false; }
  dir = dir % 8;

  // base speed of wind particles
  var baseSpeed = 30;
  var diagSpeed = baseSpeed / 1.44;
  var vx, vy;
  switch(dir) {
    case 0: vx = 0; vy = -baseSpeed; break;
    case 1: vx = diagSpeed; vy = -diagSpeed; break;
    case 2: vx = baseSpeed; vy = 0; break;
    case 3: vx = diagSpeed; vy = diagSpeed; break;
    case 4: vx = 0; vy = baseSpeed; break;
    case 5: vx = -diagSpeed; vy = diagSpeed; break;
    case 6: vx = -baseSpeed; vy = 0; break;
    case 7: vx = -diagSpeed; vy = -diagSpeed; break;
    default: return;
  }

  // if direct, the direction should change instantly
  this.targetWindV = [vx, vy];
  if (direct) { this.windV = [vx, vy]; }
};

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

  this.setWindEmitterDirection(dir);
};

/**
 * samples a new random point and adds it to distribution samples.
 *
 * @param {Array.Array.<int, int>} samples - an array of samples
 * @param {int} wi - width of the field
 * @param {int} he - height of the field
 * @returns {Array.<int, int>} a new point
 */

var randomSample = function(samples, wi, he) {
  var bestCand;
  var bestDistanceSq = 0;

  var distSq = function(p1, p2) {
    return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
  };

  for (var a = 0; a < 10; a++) {
    var cand = [Math.random() * wi, Math.random() * he];
    var maps = samples.map( distSq.bind(null, cand) );
    // js max and min doesn't work on arrays by default :(
    var minDistanceSq = Math.min.apply(null, maps);
    if (minDistanceSq > bestDistanceSq) {
      bestDistanceSq = minDistanceSq;
      bestCand = cand;
    }
  }

  return bestCand;
};

module.exports = Compass;
