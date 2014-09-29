
'use strict';

var Bonus = require('../objects/bonus');
var jQuery = require('../lib/jquery-1.11.1.min.js');

/**
 * The GameOver state shows the final score and offers the player a chance to play again.
 *
 * @constructor
 */
function GameOver() {}

GameOver.prototype = {
  preload: function () {},

  create: function () {
    this.sound.stopAll();
    this.sound.play('loadbgm', 1, true);

    var temp = this.game.add.graphics(0, 0);
    temp.beginFill(0x000000, 0.6);
    temp.drawRect(0, 0, 820, 620);
    temp.endFill();
    var fullScreenBg = this.game.add.sprite(-20, -20, temp.generateTexture());
    fullScreenBg.inputEnabled = true;
      temp.destroy();

    // should be put in the center of the screen
    var background = this.game.add.sprite(420, 320, 'encounter-background');
    background.anchor.setTo(0.5, 0.5);
    fullScreenBg.addChild(background); 

    var style = { font: '65px IM Fell English SC', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    //this.game.stage.backgroundColor = '#000';

    var winString = '';

    for (var i in this.finalModifiers) {
      var bonus = this.finalModifiers[i];
      var result = bonus.checker(this);
      if (typeof result == 'string' || result instanceof String) {
        winString += '\n' + result;
        this.score = bonus.scoreModifier(this.score);
      }
    }

    var scoreForClosure = this.score;
    // Now that we've computed the final score, pull the real high-score list, for comparison.
    jQuery.ajax({
      url: 'http://snp.scripts.mit.edu/get_scores_plunderwinds.py',
      success: function(data) {
        var lowest_highscore = data[2][1];
		alert("Lowest: " + lowest_highscore + " Your score: " + scoreForClosure);
        // Check if we have a winning highscore.
        if (scoreForClosure > lowest_highscore) {
          var name = prompt('You got ' + scoreForClosure + ' gold, which made the highscore table! What is your captain\'s name?');
          jQuery.ajax({
            url: 'http://snp.scripts.mit.edu/highscore_plunderwinds.py',
            data: {'name': name, 'score': scoreForClosure}
          });
        }
      }
    });

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, winString, { font: '32px IM Fell English SC', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 525, 'Click To Play Again', { font: '16px IM Fell English SC', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);

    var ranking = "Scum";
    var rankFrame = 0;
    if (this.score > 9) {
      ranking = "Pirate King";
      rankFrame = 3;
    }
    else if (this.score > 7) {
      ranking = "First Mate";
      rankFrame = 2;
    }
    else if (this.score > 2) {
      ranking = "Deckhand";
      rankFrame = 1;
    }
    
    this.rankText = this.game.add.text(this.game.world.centerX,300, 'You are now ranked as '+ ranking +'!', { font: '32px IM Fell English SC', fill: '#ffffff', align: 'center'});
    this.rankText.anchor.setTo(0.5, 0.5);

    var image = this.game.add.sprite(420, 435, "ranks");
    image.scale.setTo(0.9, 0.9);
    image.anchor.setTo(0.5, 0.5);
    image.frame = rankFrame;
    fullScreenBg.addChild(image);
  },

  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  },

  init: function(endState) {
    // Save the endState, so we can pass it to bonus evaluatorss
    this.endState = endState;
    this.score = endState.ship.treasure;
    this.elapsedTime = this.time.elapsedSecondsSince(endState.startTime);
  },

  finalModifiers: [
    new Bonus(function (go) { return 'Your plundering has come to an end with ' + go.score + ' gold!'; }, function (score) { return score; }),
    new Bonus(function (go) {
		var reached = function (x, y) { return go.endState.grid.tiles[x][y].playerTouched; };
        if (reached(0, 0) && reached(0, 5) && reached(5, 0) && reached(5, 5))
			return 'All four corners of the map explored! +2 gold';
      }, function (score) { return score + 2; }),
    new Bonus(function (go) {
        if (go.endState.ship.gridX != 5 && go.endState.ship.gridY != 5)
          return 'Unfortunately, you ended at sea,\nand what good is treasure if you\'re not at home?';
      }, function (score) { return 0; }),
    new Bonus(function (go) {
		var reached = function (x, y) { return go.endState.grid.tiles[x][y].playerTouched; };
        this.countReached = 0;
        for (var x = 0; x < 6; x++)
          for (var y = 0; y < 6; y++)
            if (reached(x, y))
              this.countReached++;
        if (this.countReached == 11)
          return 'You took a shortest path! +1 gold';
        if (this.countReached >= 35)
          return 'You explored as much of the as is possible! +5 gold';
      }, function (score) {
        if (this.countReached == 11)
          score++;
        if (this.countReached >= 35)
          score += 5;
        return score;
      }),
    new Bonus(function (go) {
          return 'Final gold with modifiers: ' + go.score;;
      }, function (score) { return score; })
  ]
};
module.exports = GameOver;
