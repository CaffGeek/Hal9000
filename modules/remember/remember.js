'use strict';

var trainer = require('./trainer.js');
var brain = require('./brain.js');

module.exports = {
  init: (controller) => {
    controller.storage.teams.all(function(err,data){
        data.facts.forEach(function(fact) {
          brain.remember(fact.what, fact.how);
        });
      });

    controller
      .hears('^remember (.*)', 'direct_mention', (bot, message) => {          
          trainer.train(brain, bot, message);
      })
      .hears('.*', ['direct_message','direct_mention','mention'], (bot, message) => {
        var recollection = brain.recall(message.text);
        
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