'use strict';

var config = require('./config.js');

console.log('config.bot_api_key=%s', config.bot_api_key);

require('skellington')({
  	storage: simple_storage({path: './storage/'}),
	slackToken: config.bot_api_key,
	plugins: [
		require('./lib/hush/hush.js'),
		require('./lib/status/status.js'),

		require('./lib/remember/remember.js'),
		require('./lib/remember/doyouremember.js'),
		require('./lib/remember/whatdoyouremember.js')
	]
});