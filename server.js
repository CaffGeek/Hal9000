'use strict';

const express = require('express')

const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')

var config = require('./config.js');
var Storage = require('./azure_storage.js');

console.log('config.verify_token=%s', config.verify_token);

var port = config.port;

var slapp = Slapp({
  verify_token: config.verify_token,
  convo_store: ConvoStore(),
  context: Context()
});


var remember = require('./modules/remember/index.js');
remember.init(slapp, new Storage(config));

var server = slapp.attachToExpress(express());
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening on port ${port}`);
});