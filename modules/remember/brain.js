'use strict';

var NLP = require('natural');
var classifier = new NLP.LogisticRegressionClassifier();

module.exports = brain;

var brain = {
	remember: function (what, phrases) {
		phrases.forEach(function(phrase) {
			console.log('Ingesting example for ' + what + ': ' + phrase);
			classifier.addDocument(phrase.toLowerCase(), what);
		});
		
		classifier.train();
	},
	recall: function(message) {
		var guesses = classifier.getClassifications(message.toLowerCase());

        //TODO: check security scope
        var guess = guesses.reduce(function (x, y) {
          return x && x.value > y.value ? x : y;
        });

        return {
          probabilities: guesses,
          guess: guess.value > 0.7 ? guess.label : null
        };
	}
};