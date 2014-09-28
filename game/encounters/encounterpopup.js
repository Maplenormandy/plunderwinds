'use strict';


var fullScreenBg;
var playState;

var closeEncounterPopup = function() {
	fullScreenBg.destroy(true);
    playState.endEncounter(this);
};


/**
 * A function to show an encounter popup.
 *
 * @constructor
 * @param {Phaser.Game} game - instance of Game
 * @param {Encounter} encounter The encounter that happened
 * @param {result} result - Encounter result, shoud have flavorText, descriptionText and imageKey
 * @param {function} choiceCB The callback function to call the chosen outcome with
 * @return {Outcome} The chosen outcome for the encounter
 */
var showEncounterPopup = function(game, encounter, result, play) {
    playState = play;

    game.sound.play(encounter.soundText);
    console.log(encounter.soundText);

	var popupWidth = 600;
	var popupHeight = 400;

	// a transparent black background to catch mouse events while the popup is up
	// need to draw it first and then convert it to a sprite
	var temp = game.add.graphics(0, 0);
	temp.beginFill(0x000000, 0.6);
	temp.drawRect(0, 0, 820, 620);
	temp.endFill();
	fullScreenBg = game.add.sprite(-20, -20, temp.generateTexture());
	fullScreenBg.inputEnabled = true;
    temp.destroy();

	// should be put in the center of the screen
	var background = game.add.sprite(400, 300, 'encounter-background');
	background.anchor.setTo(0.5);
	fullScreenBg.addChild(background);	

    var flavorText = game.add.text(400, 120, encounter.titleText,
        { font: '60px IM Fell English SC', fill: '#ffffff', align: 'center'});
    flavorText.anchor.setTo(0.5, 0);
    flavorText.wordWrapWidth = popupWidth - 40;
    flavorText.wordWrap = true;
    fullScreenBg.addChild(flavorText);

    var flavorText = game.add.text(400, 190, result.flavorText,
    	{ font: '36px IM Fell English SC', fill: '#ffffff', align: 'center'});
    flavorText.anchor.setTo(0.5, 0);
    flavorText.wordWrapWidth = popupWidth - 40;
    flavorText.wordWrap = true;
    fullScreenBg.addChild(flavorText);

    for (var i in result.outcomes) {
        var outcome = result.outcomes[i];

        var descriptionText = game.add.text(400, 380+i*80, outcome.flavorText,
        { font: '36px IM Fell English SC', fill: '#ffffff', align: 'center'});
        descriptionText.anchor.setTo(0.5, 0);
        descriptionText.wordWrapWidth = popupWidth - 40;
        descriptionText.wordWrap = true;

        descriptionText.inputEnabled = true;
        descriptionText.input.priorityID = 1;
        descriptionText.input.useHandCursor = true;
        descriptionText.events.onInputDown.add(closeEncounterPopup, outcome);

        fullScreenBg.addChild(descriptionText);

        var descriptionText = game.add.text(400, 416+i*80, '(' + outcome.mechanicsText + ')',
        { font: '24px IM Fell English SC', fill: '#ffffff', align: 'center'});
        descriptionText.anchor.setTo(0.5, 0);
        descriptionText.wordWrapWidth = popupWidth - 40;
        descriptionText.wordWrap = true;

        descriptionText.inputEnabled = true;
        descriptionText.input.priorityID = 1;
        descriptionText.input.useHandCursor = true;
        descriptionText.events.onInputDown.add(closeEncounterPopup, outcome);

        fullScreenBg.addChild(descriptionText);
    }
    

    // the image
    var image = game.add.sprite(400, 300 - 120, result.imageKey);
    image.anchor.setTo(0.5, 0);
    fullScreenBg.addChild(image);
};

module.exports = showEncounterPopup;