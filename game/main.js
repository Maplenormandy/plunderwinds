'use strict';

var jQuery = require('./lib/jquery-1.11.1.min.js');

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'plunderwinds');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  
  game.state.start('boot');

  // Populate the highscore table.
  jQuery.ajax({
    url: 'http://snp.scripts.mit.edu/get_scores_plunderwinds.py',
    success: function(data) {
      var string = "";
      for (var i = 0; i < 3; i++) {
        string += data[i][0] + ": " + data[i][1] + " gold";
        if (i != 2)
          string += " - ";
      }
      jQuery("#highscoreboard").text(string).html();
    }
  });
};
