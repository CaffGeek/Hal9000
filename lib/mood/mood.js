'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('mood', 'direct_mention', (bot, message) => {
      bot.api.reactions.add({name: '+1', channel: message.channel, timestamp: message.ts});

      bot.api.reminders.add({});
    });
  },

  help: {
    command: 'mood',
    text: `TODO:`
  }
};