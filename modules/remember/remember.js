'use strict';

module.exports = {
  init: (controller) => {
    controller.hears('remember (.*)', 'direct_mention', (bot, message) => {
        let thingToRemember = message.match[1];
        let team = 'remember'; //TODO: bot.identifyTeam();
        
        if (thingToRemember === 'id') {
          bot.reply(message, `I'm sorry <@${message.user}> I can't let you do that`);
          return;
        }

        var askWho = function(response, convo) {
          convo.ask('Should I remember this just for _you_, this _channel_, or _everyone_?', 
            function(response, convo) {
              convo.say(`Ok, I will remember "${thingToRemember}" for ${response.text}.`)
              askHow(response, convo);
              convo.next();
            });
        };

        var askHow = function(response, convo) {
          convo.ask('I need some example phrases people will use to find this, please enter one per line (shift-enter).', 
            function(response, convo) {
              console.log(JSON.stringify(response));
              remember(response, convo);
              convo.next();
            });
        };

        var remember = function(response, convo) {
          var responses = convo.extractResponses();
          console.log(`Responses:\n${JSON.stringify(responses, null, 2)}`);
        };

        bot.startConversation(message, askWho);

        // controller.storage.teams.get(team, function(err, data) {
        //   data = data || { id: team };
        //   data[token] = location;

        //   controller.storage.teams.save(data, function(err) {
        //     let response = `I will remember that ${token} can be found at ${location}.`;
        //     bot.reply(message, response);
        //   });
        // });
    });
  },

  help: {
    command: 'remember',
    text: `I will remember.`
  }
};