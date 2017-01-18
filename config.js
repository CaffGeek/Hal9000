var config = {};

config.verify_token = process.env.SLACK_VERIFY_TOKEN || 'verify_token';
config.port = process.env.PORT || '3000';
config.azureStorageConnection = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
config.azureContainerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "botkitstorage";

module.exports = config;
