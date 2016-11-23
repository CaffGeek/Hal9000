'use strict';

var config = require('./config.js');
var storage = require('./azure_storage.js');

console.log('config.bot_api_key=%s', config.bot_api_key);

require('skellington')({
  	storage: storage(),
	slackToken: config.bot_api_key,
	plugins: [
		require('./modules/hush/index.js'),
		require('./modules/status/index.js'),
		require('./modules/remember/index.js')
	]
});