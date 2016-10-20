'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('do you remember (.*)', 'direct_mention', (bot, message) => {
        var token = message.match[1];

        controller.storage.teams.get('remember', function(err, data) {
          data = data || { id: 'remember' };
          let location = data[token];

          let response = (location) 
            ? `${token} can be found at ${location}.`
            : `I don't know about ${token}`;

          bot.reply(message, response)
        });
    });
  },

  help: {
    command: 'where is',
    text: `I will find it.`
  }
};