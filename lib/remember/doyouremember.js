'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('do you remember (.*)', 'direct_mention', (bot, message) => {
        var token = results[1];

        bot.reply(message, `You can find ${token} at ${location}.`)
    });
  },

  help: {
    command: 'where is',
    text: `I will find it.`
  }
};