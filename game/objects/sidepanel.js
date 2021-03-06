'use strict';
var Compass = require('./compass');

var encounters = {
  Pirates: require('../encounters/pirates'),
  RoyalNavy: require('../encounters/royalnavy'),
  Treasure: require('../encounters/treasure')
};

/**
	@author: Tricia
	@constructor
	@param {Play} play
*/

function Sidepanel(play){

	// reference to the game and play state
	this.play = play;
	this.game = play.game;
	this.ship = play.ship;

	/**
		places the compass
		200x200
	*/
	this.compass = new Compass(this.game, this, 700, 500);

	// places the background

	this.background = this.game.add.graphics(600, 0);
	this.background.beginFill(0xF1F1D4);
	this.background.drawRect(0, 0, 200, 600);
	this.background.endFill();

	/**
		places stamina bar, default 20 stamina
	*/ 
	var stamwords = "stamina \n " + this.ship.stamina;
	var stamstyle = {font: "25px IM Fell English SC", fill: '#000000', align: "center"};
	this.stamtext = this.game.add.text(650, 25, stamwords, stamstyle);
	this.stamtext.anchor.setTo(0.5, 0);

	/**
		places gold bar, default 0 gold
	*/
	var goldwords = "gold \n 0";
	var goldstyle = {font: "25px IM Fell English SC", fill: '#000000', align: "center"};
	this.goldtext = this.game.add.text(750, 25, goldwords, goldstyle);
	this.goldtext.anchor.setTo(0.5, 0);



	/**
	  places encounters remaining
	*/
	var encounterwords = "remaining encounters";
	var encounterstyle = {font: "20px IM Fell English SC", fill: '#000000', align: "center"};
	this.encounterText2 = this.game.add.text(700, 100, encounterwords, encounterstyle);
	this.encounterText2.anchor.setTo(0.5, 0);

	var encounterstyle2 = {font: "20px IM Fell English SC", fill: '#000000', align: "left"};
	var encounterstyle3 = {font: "20px IM Fell English SC", fill: '#000000', align: "right"};
	this.encounterText = [0, 0, 0, 0, 0, 0];
	this.encounterText[0] = this.game.add.text(625, 120, "pirates", encounterstyle2);
	this.encounterText[1] = this.game.add.text(625, 140, "treasure", encounterstyle2);
	this.encounterText[2] = this.game.add.text(625, 160, "royal navy", encounterstyle2);

	this.encounterText[3] = this.game.add.text(775, 120, "6", encounterstyle2);
	this.encounterText[3].anchor.setTo(1.0, 0);
	this.encounterText[4] = this.game.add.text(775, 140, "8", encounterstyle2);
	this.encounterText[4].anchor.setTo(1.0, 0);
	this.encounterText[5] = this.game.add.text(775, 160, "4", encounterstyle2);
	this.encounterText[5].anchor.setTo(1.0, 0);

	this.compass.phSprite.bringToTop();
	this.compass.arrow.bringToTop();

	/**
	 Spyglass (i.e. tile help text)
	 */
	var spyglassstyle = {font: "25px IM Fell English SC", fill: '#000000', align: "center"};
	this.spyglassText = this.game.add.text(700, 220, "spyglass", spyglassstyle);
	this.spyglassText.anchor.setTo(0.5, 0);

	this.spyTile = this.game.add.sprite(700, 210, 'tiles');
  this.spyTile.scale.setTo(0.15, 0.15);
  this.spyTile.anchor.setTo(0.5, 0.5);

	var spydescripttext = "Hover over a tile to see more details!";
	var spydescriptstyle = {font: "16px IM Fell English SC", fill: '#000000', align: "center",
		wordWrap: true, wordWrapWidth: 180};
	this.spyDescriptionText = this.game.add.text(700, 250, spydescripttext, spydescriptstyle);
	this.spyDescriptionText.anchor.setTo(0.5, 0);

}

// Draw new text to reflect the ship's state.
Sidepanel.prototype.update = function() {
  // update stamina bar
	var stamwords = "stamina \n " + this.ship.stamina;
	this.stamtext.text = stamwords;

  // update gold counter
  // TODO: gold and treasure are the same thing, should be called same
	var goldwords = "gold \n " + this.ship.treasure;
	this.goldtext.text = goldwords;

	var piratesLeft = 0;
	var treasureLeft = 0;
	var navyLeft = 0;
	for (var i in this.play.encounterManager.encounters) {
		var enc = this.play.encounterManager.encounters[i];
		if (enc instanceof encounters.Pirates) {
			piratesLeft++;
		} else if (enc instanceof encounters.Treasure) {
			treasureLeft++;
		} else if (enc instanceof encounters.RoyalNavy) {
			navyLeft++;
		}
	}

	this.encounterText[3].text = '' + piratesLeft;
	this.encounterText[4].text = '' + treasureLeft;
	this.encounterText[5].text = '' + navyLeft;
}

module.exports = Sidepanel;
