'use strict';

var config = require('./config.js');

console.log('config.bot_api_key=%s', config.bot_api_key);

require('skellington')({
	slackToken: config.bot_api_key,
	plugins: [
		require('./lib/hush'),
		require('skellington-markov')
	]
});