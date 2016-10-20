'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('where is', 'direct_mention', (bot, message) => {
        var results = message.match(/remember (.*) can be found at (.*)/);
        var token = results[1];
        var location = results[2];

        bot.reply(message, "I will remember that ${token} can be found at ${location}.")
    });
  },

  help: {
    command: 'where is',
    text: `I will find it.`
  }
};