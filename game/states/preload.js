
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
    this.load.image('pirate', 'assets/logo.png');
    this.load.image('compass', 'assets/compass.png');
    this.load.image('compass_arrow', 'assets/compassarrow-01.png')
    this.load.spritesheet('encounter-background', 'assets/encounter-background.png', 800, 600)

    this.load.spritesheet('tiles', 'assets/tiles3-01.png', 200, 200);
    this.load.spritesheet('ship', 'assets/shipv2-100x100.png', 100, 100);
    this.load.spritesheet('icons', 'assets/icons.png', 200, 200)
    this.load.spritesheet('ranks', 'assets/ranks.png', 200, 200)
    this.load.audio('navyfx', 'assets/man_canon.mp3');
    this.load.audio('treasurefx', 'assets/husky70__Counting_Me_Shillings.mp3');
    this.load.audio('piratefx', 'assets/cgeffex_Ships_Bell.mp3');
    this.load.audio('errorfx','assets/autistic-lucario__error.wav');
    this.load.audio('loadbgm', 'assets/ZipZipper_The_Terrible_Tale.mp3');
    this.load.audio('gamebgm', 'assets/Waterflame_Glorious_Morning.mp3');

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
