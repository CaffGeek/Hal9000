'use strict';

const express = require('express')

const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')

var config = require('./config.js');
var Storage = require('./azure_storage.js');

console.log('config.bot_api_key=%s', config.bot_api_key);

var port = config.port;

var slapp = Slapp({
  // Beep Boop sets the SLACK_VERIFY_TOKEN env var
  verify_token: config.verify_token,
  convo_store: ConvoStore(),
  context: Context()
});


var remember = require('./modules/remember/index.js');
remember.init(slapp, new Storage());

var server = slapp.attachToExpress(express());
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening on port ${port}`);
});