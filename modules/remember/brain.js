'use strict';

var NLP = require('natural');

module.exports = Brain;

function Brain() {
	console.log('Brain initializing!')
	this.classifiers = {};
	this.minConfidence = 0.7;
}

Brain.prototype.remember = function (fact) {
	console.log(`Fact: ${JSON.stringify(fact, null, 2)}`);

	if (!(fact.who in this.classifiers))
		this.classifiers[fact.who] = new NLP.LogisticRegressionClassifier();
	var classifier = this.classifiers[fact.who];

	fact.how.forEach(function (phrase) {
		console.log(`Ingesting example for ${fact.what} : ${phrase}`);
		classifier.addDocument(phrase.toLowerCase(), fact.what);
	}.bind(this));

	console.log(`done training`);
	classifier.train();

	return this;
};

Brain.prototype.recall = function(message) {
	console.log(`Message: ${JSON.stringify(message)}`);
	
	var guesses = [];
	
	//TODO: only give "you/me" option if IN a direct_message with the bot
	if (message.user in this.classifiers) 
		guesses = guesses.concat(this.classifiers[message.user].getClassifications(message.text.toLowerCase()));
	
	if (message.channel in this.classifiers) 
		guesses = guesses.concat(this.classifiers[message.channel].getClassifications(message.text.toLowerCase()));
	
	if (message.team in this.classifiers) guesses = 
		guesses.concat(this.classifiers[message.team].getClassifications(message.text.toLowerCase()));

	var guess = guesses.length ? guesses.reduce(function (x, y) {
		return x && x.value > y.value ? x : y;
	}) : { /* got nothing */ };

	return {
		probabilities: guesses,
		guess: guess.value > 0.7 ? guess.label : null
	};
};