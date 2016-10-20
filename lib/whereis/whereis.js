'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('remember', 'direct_message, direct_mention', (bot, message) => {
        bot.reply(message, "I forget.")
    });
  },

  help: {
    command: 'hush',
    text: `I will listen in on any channel you invite me to, if anyone uses \`@channel\`, \`@here\`, \`@everyone\`, or \`@group\` I will politely DM them to let them know that\'s not the best idea.`
  }
};