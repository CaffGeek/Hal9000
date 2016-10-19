'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('status', 'direct_mention', (bot, message) => {
      bot.api.reactions.add({name: '+1', channel: message.channel, timestamp: message.ts});

      bot.api.reminder.add({});
    });
  },

  help: {
    command: 'status',
    text: `TODO:`
  }
};