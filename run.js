'use strict';

var config = require('./config.js');

console.log('config.bot_api_key=%s', config.bot_api_key);

require('skellington')({
  	json_file_store: 'hal9000_storage.json',
	slackToken: config.bot_api_key,
	plugins: [
		require('./lib/hush/hush.js'),
		require('./lib/status/status.js'),

		require('./lib/remember/remember.js'),
		require('./lib/remember/doyouremember.js'),
		require('./lib/remember/whatdoyouremember.js')
	]
});