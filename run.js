'use strict';

var config = require('./config.js');
var storage = require('./azure_storage.js');

console.log('config.bot_api_key=%s', config.bot_api_key);

require('skellington')({
  	storage: storage(),
	slackToken: config.bot_api_key,
	plugins: [
		require('./modules/hush/hush.js'),
		require('./modules/status/status.js'),

		require('./modules/remember/remember.js'),
		require('./modules/remember/doyouremember.js'),
		require('./modules/remember/whatdoyouremember.js')
	]
});