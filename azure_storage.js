var azure = require('azure-storage');

module.exports = function(config) {
    config = config || {};
    
    //TODO: change to use config.js
    config.azureStorageConnection = config.azureStorageConnection || process.env.AZURE_STORAGE_CONNECTION_STRING || "";
    config.azureContainerName = config.azureContainerName ||  process.env.AZURE_STORAGE_CONTAINER_NAME || "botkitstorage";

    console.log('config.azureStorageConnection=%s', config.azureStorageConnection);
    console.log('config.azureContainerName=%s', config.azureContainerName);
    
    var blobService = azure.createBlobService(config.azureStorageConnection);

    blobService.createContainerIfNotExists(config.azureContainerName, 
        function(error, result, response) {
            if (!error) {
                console.log('ERROR CREATING CONTAINER "%s"', config.azureContainerName);
                console.log(error);
            } else {
                console.log('Created container %s', config.azureContainerName);
            }
        }
    );

    // var objectsToList = function(cb) {
    //     return function(err, data) {
    //         if (err) {
    //             cb(err, data);
    //         } else {
    //             cb(err, Object.keys(data).map(function(key) {
    //                 return data[key];
    //             }));
    //         }
    //     };
    // };
    
    var storage = {
        teams: {
            get: function(team_id, cb) {
                blobService.getBlobToText(
                    config.azureContainerName, 
                    team_id, 
                    function(err, data) {
                        cb(err, JSON.parse(data))
                    });
            },
            save: function(team_data, cb) {
                blobService.createBlockBlobFromText(
                    config.azureContainerName, 
                    team_data.id, 
                    JSON.stringify(team_data), cb);
            },
            all: function(cb) {
                console.log('...in teams.all');
                //teams_db.all(objectsToList(cb));
            }
        },
        users: {
            get: function(user_id, cb) {
                users_db.get(user_id, cb);
            },
            save: function(user, cb) {
                users_db.save(user.id, user, cb);
            },
            all: function(cb) {
                users_db.all(objectsToList(cb));
            }
        },
        channels: {
            get: function(channel_id, cb) {
                channels_db.get(channel_id, cb);
            },
            save: function(channel, cb) {
                channels_db.save(channel.id, channel, cb);
            },
            all: function(cb) {
                channels_db.all(objectsToList(cb));
            }
        }
    };

    return storage;
};