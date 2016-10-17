var config = {};

config.bot_api_key = process.env.SLACK_TOKEN || 'slack_api_key';
config.botname = process.env.BOT_NAME || 'hal9000';

module.exports = config;
