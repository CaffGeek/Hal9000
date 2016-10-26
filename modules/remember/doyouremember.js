'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('do you remember (.*)', 'direct_mention', (bot, message) => {
        var token = message.match[1];

        controller.storage.teams.get('remember', function(err, data) {
          console.log('err %s', err);
          console.log('data %s', data);
          console.log('token %s', token);
          console.log('data[token] %s', data[token]);
          
          data = data || { id: 'remember' };
          let location = data[token];
          console.log('data %s', data);
          console.log('token %s', token);
          console.log('data[token] %s', data[token]);
          console.log('location %s', location);

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