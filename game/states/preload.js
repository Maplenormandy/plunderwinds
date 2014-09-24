
'use strict';
/**
 * The Preload state loads all of the assets for the game.
 *
 * @constructor
 */


function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.stage.backgroundColor = "#000";

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('pirate', 'assets/pirate.png');
    this.load.image('compass', 'assets/compass.png');
    this.load.image('compass_arrow', 'assets/compassarrow-01.png')
    this.load.spritesheet('tiles', 'assets/tiles2-01.png', 200, 200);
/*    this.load.image('tile0', 'assets/tile0.png');
    this.load.image('tile1', 'assets/tile1.png');
    this.load.image('tile2', 'assets/tile2.png');
    this.load.image('tile3', 'assets/tile3.png');
    this.load.image('tile4', 'assets/tile4.png');
    this.load.image('tile5', 'assets/tile5.png');
    this.load.image('tile6', 'assets/tile6.png');
    this.load.image('tile7', 'assets/tile7.png');
    this.load.image('tile8', 'assets/tile8.png');*/

    /**
      loads the fonts
    */
    WebFont.load({
      google: {
        families: ['Meddon', 'IM Fell English SC']
      }
    })

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
