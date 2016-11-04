'use strict';

var NLP = require('natural');

module.exports = Brain;

function Brain() {
	console.log('Brain initializing!')
  this.classifier = new NLP.LogisticRegressionClassifier();
  this.minConfidence = 0.7;
}

Brain.prototype.remember = function (what, phrases) {
	phrases.forEach(function (phrase) {
		console.log('Ingesting example for ' + what + ': ' + phrase);
		this.classifier.addDocument(phrase.toLowerCase(), what);
	}).bind(this);

	classifier.train();

	return this;
};

Brain.prototype.recall = function(message) {
	var guesses = classifier.getClassifications(message.toLowerCase());

	//TODO: check security scope
	var guess = guesses.reduce(function (x, y) {
				return x && x.value > y.value ? x : y;
	});

	return {
				probabilities: guesses,
				guess: guess.value > 0.7 ? guess.label : null
	};
};