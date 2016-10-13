'use strict';

var fs = require("fs");
var path = require('path');
var util = require('util');
var Bot = require('slackbots');
var request = require('request');

var Hal9000 = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'Hal9000';
    this.params = {as_user: true};
    this.modules = this.loadModules();
};
util.inherits(Hal9000, Bot);

Hal9000.prototype.run = function () {

    Hal9000.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

Hal9000.prototype._onMessage = function(data){

	if(this._isMessage(data) 
        //&& this._isTheMessageForMe(data) 
        && !this._isItMe(data)){
		this._parseText(data);
	}
};

Hal9000.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

Hal9000.prototype._isMessage = function(data){
	return data.type === 'message' && Boolean(data.text);
};

Hal9000.prototype._isChannelConversation = function(data){
	return typeof data.channel === 'string' && data.channel[0] === 'C';
};

Hal9000.prototype._isItMe = function(data){
	return data.username === this.user.id;
};

Hal9000.prototype._isTheMessageForMe = function(data){
	return data.text.toLowerCase().indexOf('@'+this.user.id.toLowerCase()) > -1;
};

Hal9000.prototype._onStart = function(data){
	this._loadBotUser();
};

Hal9000.prototype._parseText = function(data){

    for(var i = 0; i < this.modules.length; i++){
        this.modules[i].setData(data);
        this.modules[i].manage();
    }
};

Hal9000.prototype.loadModules = function(){

    var modules = [];
    var modulesDirectories = this.getDirectories('modules');

    for(var i = 0; i < modulesDirectories.length; i++){
        var moduleName = modulesDirectories[i];
        var module = require(path.resolve(__dirname+'/modules/'+moduleName+'/', moduleName)+'.js');
        module = new module(this);
        modules.push(module);
    }

    return modules;
};

Hal9000.prototype.getDirectories = function(srcpath) {
    srcpath = path.resolve(__dirname, srcpath);
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

module.exports = Hal9000;
