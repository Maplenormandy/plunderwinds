'use strict';
var Compass = require('./compass');
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
	this.compass = new Compass(this.game, 700, 500);

	/**
		places stamina bar, default 20 stamina
	*/ 
	var stamwords = "stamina \n " + this.ship.stamina;
	var stamstyle = {font: "25px IM Fell English SC", fill: '#000000', align: "center"};
	this.stamtext = this.game.add.text(650, 325, stamwords, stamstyle);
	this.stamtext.anchor.setTo(0.5, 0);

	/**
		places gold bar, default 0 gold
	*/
	var goldwords = "gold \n 0";
	var goldstyle = {font: "25px IM Fell English SC", fill: '#000000', align: "center"};
	this.goldtext = this.game.add.text(750, 325, goldwords, goldstyle);
	this.goldtext.anchor.setTo(0.5, 0);

	/**
		places options text
	*/
	var optionswords = "options";
	var optionsstyle = {font: "25px IM Fell English SC", fill: '#000000', align: "center"};
	this.optionstext = this.game.add.text(700, 25, optionswords, optionsstyle);
	this.optionstext.anchor.setTo(0.5, 0);
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
}

module.exports = Sidepanel;
