'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('remember (.*) can be found at (.*)', 'direct_mention', (bot, message) => {
        let token = message.match[1];
        let location = message.match[2];

        if (token === 'id') {
          bot.reply(message, `I'm sorry <@${message.user}> I can't let you do that`);
          return;
        }

        controller.storage.teams.get('remember', function(err, data) {
          data = data || { id: 'remember' };
          data[token] = location;

          controller.storage.teams.save(data, function(err) {
            let response = `I will remember that ${token} can be found at ${location}.`;
            bot.reply(message, response);
          });
        });
    });
  },

  help: {
    command: 'remember',
    text: `I will remember.`
  }
};