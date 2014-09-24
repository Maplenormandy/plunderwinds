'use strict';


var fullScreenBg;

var closeEncounterPopup = function() {
	fullScreenBg.destroy(true);
};


/**
 * A function to show an encounter popup.
 *
 * @constructor
 * @param {Phaser.Game} game - instance of Game
 * @param {Outcome} outcome - Encounter outcome, shoud have flavorText, descriptionText and imageKey
 */
var showEncounterPopup = function(game, outcome) {
	var popupWidth = 400;
	var popupHeight = 400;

	// a transparent black background to catch mouse events while the popup is up
	// need to draw it first and then convert it to a sprite
	var temp = game.add.graphics(0, 0);
	temp.beginFill(0x000000, 0.6);
	temp.drawRect(0, 0, 800, 600);
	temp.endFill();
	fullScreenBg = game.add.sprite(0, 0, temp.generateTexture());
	fullScreenBg.inputEnabled = true;
    temp.destroy();

	// should be put in the center of the screen
	var background = game.add.sprite(400, 300, 'encounter-background');
	background.anchor.setTo(0.5);
	fullScreenBg.addChild(background);

	// put the close button in the top right corner 
	var closeButton = game.add.sprite(400+popupWidth/2, 300-popupHeight/2, 'encounter-close');
	closeButton.anchor.setTo(1, 0);
	closeButton.inputEnabled = true;
    closeButton.input.priorityID = 1;
    closeButton.input.useHandCursor = true;
    closeButton.events.onInputDown.add(closeEncounterPopup, this);
    fullScreenBg.addChild(closeButton);

    var flavorText = game.add.text(400, 300+80, outcome.flavorText,
    	{ font: '50px IM Fell English SC', fill: '#ffffff', align: 'center'});
    flavorText.anchor.setTo(0.5, 0);
    flavorText.wordWrapWidth = popupWidth - 40;
    flavorText.wordWrap = true;
    fullScreenBg.addChild(flavorText);

    var descriptionText = game.add.text(400, 300, outcome.descriptionText,
    	{ font: '50px IM Fell English SC', fill: '#ffffff', align: 'center'});
    descriptionText.anchor.setTo(0.5, 0);
    descriptionText.wordWrapWidth = popupWidth - 40;
    descriptionText.wordWrap = true;
    fullScreenBg.addChild(descriptionText);

    // the image
    var image = game.add.sprite(400, 300 - 120, outcome.imageKey);
    image.anchor.setTo(0.5, 0);
    fullScreenBg.addChild(image);
};

module.exports = showEncounterPopup;