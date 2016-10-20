'use strict';

var config = require('./config.js');

console.log('config.bot_api_key=%s', config.bot_api_key);

require('skellington')({
	slackToken: config.bot_api_key,
	plugins: [
		require('./lib/hush/hush.js'),
		require('./lib/status/status.js'),
		require('./lib/whereis/whereis.js'),
		require('./lib/whereis/remember.js')
	]
});