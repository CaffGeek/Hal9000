'use strict';

var NLP = require('natural');
var classifier = new NLP.LogisticRegressionClassifier();

function train(what, phrases) {
  phrases.forEach(function(phrase) {
    console.log('Ingesting example for ' + what + ': ' + phrase);
    classifier.addDocument(phrase.toLowerCase(), what);
  });

  classifier.train();
};

module.exports = {
  init: (controller) => {
    //TODO: Reload training from db
    controller
      .hears('^remember (.*)', 'direct_mention', (bot, message) => {
          let thingToRemember = message.match[1];
          let team = 'remember'; //TODO: bot.identifyTeam();

          var askWho = function(response, convo) {
            convo.ask('Should I remember this just for _you_, this _channel_, or _everyone_?', 
              function(response, convo) {
                convo.say(`Ok, I will remember "${thingToRemember}" for ${response.text}.`)
                askHow(response, convo);
                convo.next();
              }, { key: 'who', multiple: false });
          };

          var askHow = function(response, convo) {
            convo.ask('I need some example phrases people will use to find this, say "done" to finish.', 
              function(response, convo) {              
                if (response.text == 'done') {
                  remember(response, convo);
                  convo.next();
                }
              }, { key: 'how', multiple: true });
          };

          var remember = function(response, convo) {
            var responses = convo.extractResponses();
            let fact = {
              what: thingToRemember,
              who: responses.who,
              how: responses.how.split('\n').filter(function(x){ return x != 'done';})
            };

            convo.say(`Fact:\n\`\`\`${JSON.stringify(fact, null, 2)}\`\`\``);

            train(fact.what, fact.how);

            //TODO: save facts...
            // controller.storage.teams.get(team, function(err, data) {
            //   data = data || { id: team };
            //   data[token] = location;

            //   controller.storage.teams.save(data, function(err) {
            //     let response = `I will remember that ${token} can be found at ${location}.`;
            //     bot.reply(message, response);
            //   });
            // });
          };

          bot.startConversation(message, askWho);
      })
      .hears('.*', 'direct_mention', (bot, message) => {        
        var guesses = classifier.getClassifications(message.text.toLowerCase());
        var guess = guesses.reduce(function (x, y) {
          return x && x.value > y.value ? x : y;
        });

        var interpretation = {
          probabilities: guesses,
          guess: guess.value > 0.7 ? guess.label : null
        };
        
        console.log('Heard: ' + message.text);
        console.log('Interpretation: ', interpretation);
            
        if (interpretation.guess) {
          console.log('\o/');
          bot.reply(message, 'Are you looking for ' + interpretation.guess);
        } else {
          console.log(':`()');
          bot.reply(message, 'Hmm... I couldn\'t tell what you said...');
          bot.reply(message, '```\n' + JSON.stringify(interpretation, null, 2) + '\n```');
        }
      });
  },

  help: {
    command: 'remember',
    text: `I will remember.`
  }
};