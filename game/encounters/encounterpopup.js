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

    console.log(result)
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
	var background = game.add.sprite(320, 300, 'encounter-background');
    background.scale.setTo(0.72, 0.86);
    background.anchor.setTo(0.5, 0.5);
	fullScreenBg.addChild(background);	

    var flavorText = game.add.text(320, 120, encounter.titleText,
        { font: '60px IM Fell English SC', fill: '#ffffff', align: 'center'});
    flavorText.anchor.setTo(0.5, 0);
    flavorText.wordWrapWidth = popupWidth - 40;
    flavorText.wordWrap = true;
    fullScreenBg.addChild(flavorText);

    var flavorText = game.add.text(320, 190, result.flavorText,
    	{ font: '36px IM Fell English SC', fill: '#ffffff', align: 'center'});
    flavorText.anchor.setTo(0.5, 0);
    flavorText.wordWrapWidth = popupWidth - 40;
    flavorText.wordWrap = true;
    fullScreenBg.addChild(flavorText);

    for (var i in result.outcomes) {
        var outcome = result.outcomes[i];

        var descriptionTexts = {};

        descriptionTexts.a = game.add.text(320, 380+i*80, outcome.flavorText,
        { font: '36px IM Fell English SC', fill: '#ffffff', align: 'center'});
        descriptionTexts.a.anchor.setTo(0.5, 0);
        descriptionTexts.a.wordWrapWidth = popupWidth - 40;
        descriptionTexts.a.wordWrap = true;

        descriptionTexts.a.inputEnabled = true;
        descriptionTexts.a.input.priorityID = 1;
        descriptionTexts.a.input.useHandCursor = true;
        descriptionTexts.a.events.onInputDown.add(closeEncounterPopup, outcome);

        fullScreenBg.addChild(descriptionTexts.a);

        descriptionTexts.b = game.add.text(320, 416+i*80, '(' + outcome.mechanicsText + ')',
        { font: '24px IM Fell English SC', fill: '#ffffff', align: 'center'});
        descriptionTexts.b.anchor.setTo(0.5, 0);
        descriptionTexts.b.wordWrapWidth = popupWidth - 40;
        descriptionTexts.b.wordWrap = true;

        descriptionTexts.b.inputEnabled = true;
        descriptionTexts.b.input.priorityID = 1;
        descriptionTexts.b.input.useHandCursor = true;
        descriptionTexts.b.events.onInputDown.add(closeEncounterPopup, outcome);

        fullScreenBg.addChild(descriptionTexts.b);

        descriptionTexts.a.events.onInputOver.add(function() {
            this.a.fill = '#ffff00';
            this.b.fill = '#ffff00';
        }, descriptionTexts);
        descriptionTexts.a.events.onInputOut.add(function() {
            this.a.fill = '#ffffff';
            this.b.fill = '#ffffff';
        }, descriptionTexts);
        descriptionTexts.b.events.onInputOver.add(function() {
            this.a.fill = '#ffff00';
            this.b.fill = '#ffff00';
        }, descriptionTexts);
        descriptionTexts.b.events.onInputOut.add(function() {
            this.a.fill = '#ffffff';
            this.b.fill = '#ffffff';
        }, descriptionTexts);
    }
    

    // the image
    var image = game.add.sprite(320, 320, "icons");
    image.scale.setTo(0.8, 0.8);
    image.anchor.setTo(0.5, 0.5);
    image.frame = result.frame;
    fullScreenBg.addChild(image);
};

module.exports = showEncounterPopup;