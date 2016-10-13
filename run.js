'use strict';

var config = require('./config.js');
var Hal9000 = require('./lib/hal9000.js');

console.log('config.bot_api_key=%s', config.bot_api_key);
console.log('config.botname=%s', config.botname);

var hal9000 = new Hal9000(
{
	token: config.bot_api_key,
	name: config.botname
});

hal9000.run();