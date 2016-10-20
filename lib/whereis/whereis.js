'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('remember', 'direct_mention', (bot, message) => {
        bot.reply(message, "I forget.")
    });
  },

  help: {
    command: 'whereis',
    text: `I will remember.`
  }
};