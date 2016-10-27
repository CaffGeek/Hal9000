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
            if (error) {
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
    
    var get = function(id, cb) {
        blobService.getBlobToText(
            config.azureContainerName, 
            id, 
            function(err, data) {
                cb(err, JSON.parse(data))
            });
    };

    var save = function(data, cb) {
        blobService.createBlockBlobFromText(
            config.azureContainerName, 
            data.id, 
            JSON.stringify(data), cb);
    };

    var all = function(cb) {
        blobService.listBlobsSegmented(
            config.azureContainerName,
            null,            
            function (err, result, response) {
                if (!result || !result.entries) 
                    return;

                result.entries.forEach(function(entry) {
                    get(entry.name, cb);
                });
                console.log(`continuationToke: ${result.continuationToken}`);
            });
    };

    var storage = {
        teams: {
            get: get,
            save: save,
            all: all
        },
        users: {
            get: get,
            save: save,
            all: all
        },
        channels: {
            get: get,
            save: save,
            all: all
        }
    };

    return storage;
};
