'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('what do you remember', 'direct_mention', (bot, message) => {
        controller.storage.teams.get('remember', function(err, data) {
          if (!data) {
            bot.reply(message, "I know nothing. Please tell me what to remember");
            return;
          }
            
          Object.keys(data).forEach(function(token) {
            if (token === 'id') return;
            
            let location = data[token];
            let response = `${token} can be found at ${location}.`;
            bot.reply(message, response);
          });
        });
    });
  },

  help: {
    command: 'where is',
    text: `I will find it.`
  }
};