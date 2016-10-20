'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('remember (.*) can be found at (.*)', 'direct_mention', (bot, message) => {
        let token = message.match[1];
        let location = message.match[2];

        bot.reply(message, "I will remember that ${token} can be found at ${location}.")
    });
  },

  help: {
    command: 'remember',
    text: `I will remember.`
  }
};