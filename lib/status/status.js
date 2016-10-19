'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('status', 'direct_mention', (bot, message) => {
      bot.startPrivateConversation({user: message.user}, function(err, convo) {
        if (err) return;
        
        convo.ask(`Would you like to file your status report?`, [
          {
            pattern: bot.utterances.yes,
            callback: function(_, c) {
              c.next();
              resolve();
            }
          },
          {
            default: true,
            callback: function(_, c) {
              c.say('Okay! Maybe later. :simple_smile:');
              c.next();
              reject();
            }
          }
        ]);

      });
    });
  },

  help: {
    command: 'status',
    text: `TODO:`
  }
};