'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('what do you remember', 'direct_mention', (bot, message) => {
        var token = results[1];

        bot.reply(message, `I know about all of `)
    });
  },

  help: {
    command: 'where is',
    text: `I will find it.`
  }
};