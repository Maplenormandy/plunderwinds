'use strict';
/**
	@author: Tricia
	@constructor
	@param {Phaser.game} game
*/

function Sidepanel(game){
	/**
		places the compass
	*/
	var compass = game.add.sprite(600, 400, 'compass');
	compass.scale.setTo(0.4, 0.4);

	/**
		places stamina bar, default 20 stamina
	*/ 
	var stamwords = "stamina \n 20";
	var stamstyle = {font: "25px IM Fell English SC", fill: '#ffffff', align: "center"};
	var stamtext = game.add.text(650, 325, stamwords, stamstyle);
	stamtext.anchor.setTo(0.5, 0);

	/**
		places gold bar, default 0 gold
	*/
	var goldwords = "gold \n 0";
	var goldstyle = {font: "25px IM Fell English SC", fill: '#ffffff', align: "center"};
	var goldtext = game.add.text(750, 325, goldwords, goldstyle);
	goldtext.anchor.setTo(0.5, 0);

	/**
		places options text
	*/
	var optionswords = "options";
	var optionsstyle = {font: "25px IM Fell English SC", fill: '#ffffff', align: "center"};
	var optionstext = game.add.text(700, 25, optionswords, optionsstyle);
	optionstext.anchor.setTo(0.5, 0);

}
module.exports = Sidepanel;