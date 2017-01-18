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
      .hears('^remember (.*)', ['direct_message','direct_mention','mention'], (message) => {
          trainer.train(brain, message, controller);
      })
      .hears('.*', ['direct_message','direct_mention','mention'], (message) => {
        var recollection = brain.recall(message);
        
        console.log('Heard: ' + message.text);
        console.log('Recollection: ', recollection);
            
        if (recollection.guess) {
          message.respond(`Are you looking for ${recollection.guess}`);
          message.respond(`Other options are: ${JSON.stringify(recollection.probabilities, null, 2)}`);
        } else {
          message.respond(`I'm sorry ~Dave~ <@${message.user}> I can't let you do that...`);
          message.respond('```\n' + JSON.stringify(recollection, null, 2) + '\n```');
        }
      });
  },

  help: {
    command: 'remember',
    text: `I will remember.`
  }
};
