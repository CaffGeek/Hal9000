'use strict';

var Trainer = require('./trainer.js');
var Brain = require('./brain.js');

module.exports = {
  init: (controller, storage) => {
    console.log('storage')
    console.log(storage);
    var brain = new Brain();
    var trainer = new Trainer(controller);

    storage.teams.all(function(err,data) {
        data.facts.forEach(function(fact) {
          console.log('Reloading past memories')
          brain.remember(fact);
        });
      });

    controller
      .message('^remember (.*)', ['direct_message','direct_mention','mention'], (message, text) => {
        trainer.train(brain, messageInfo, storage);
      })
      .route('handleWho', trainer.handleWho)
      .route('handleHow', trainer.handleHow)
      .message('^what do you know', ['direct_message','direct_mention','mention'], (message, text) => {
        message.say('this feature is not done yet, sorry');
      })
      .message('.*', ['direct_message','direct_mention','mention'], (message, text) => {
        console.log(`msg: ${JSON.stringify(message)}`);

        //TODO: remove duplication
        var messageInfo = {
          user: message.body.event.user,
          channel: message.body.event.channel,
          team: message.body.team_id,
          text: message.body.event.text,
        };

        console.log(`message: ${JSON.stringify(messageInfo)}`);

        var recollection = brain.recall(messageInfo);
        
        console.log('Heard: ' + messageInfo.text);
        console.log('Recollection: ', recollection);
            
        if (recollection.guess) {
          message.say(`Are you looking for ${recollection.guess}`);
          console.log(`Other options are: ${JSON.stringify(recollection.probabilities, null, 2)}`);
        } else {
          message.say(`I'm sorry ~Dave~ <@${messageInfo.user}> I can't let you do that...`);
          console.log('```\n' + JSON.stringify(recollection, null, 2) + '\n```');
        }
      });
  },

  help: {
    command: 'remember',
    text: `I will remember.`
  }
};
