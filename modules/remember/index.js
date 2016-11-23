'use strict';

var Trainer = require('./trainer.js');
var Brain = require('./brain.js');

module.exports = {
  init: (controller) => {
    var brain = new Brain();
    var trainer = new Trainer();

    controller.storage.teams.all(function(err,data) {
        data.facts.forEach(function(fact) {
          console.log('Reloading past memories')
          brain.remember(fact);
        });
      });

    controller
      .hears('^remember (.*)', ['direct_message','direct_mention','mention'], (bot, message) => {
          trainer.train(brain, bot, message, controller);
      })
      .hears('.*', ['direct_message','direct_mention','mention'], (bot, message) => {
        var recollection = brain.recall(message);
        
        console.log('Heard: ' + message.text);
        console.log('Recollection: ', recollection);
            
        if (recollection.guess) {
          bot.reply(message, 'Are you looking for ' + recollection.guess);
        } else {
          bot.reply(message, `I'm sorry ~Dave~ <@${message.user}> I can't let you do that...`);
          bot.reply(message, '```\n' + JSON.stringify(recollection, null, 2) + '\n```');
        }
      });
  },

  help: {
    command: 'remember',
    text: `I will remember.`
  }
};