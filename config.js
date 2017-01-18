var config = {};

config.verify_token = process.env.SLACK_VERIFY_TOKEN || 'verify_token';
config.port = process.env.PORT || '3000';

module.exports = config;
