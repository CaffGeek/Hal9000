'use strict';

const smb = require('slack-message-builder')

module.exports = Trainer;

function Trainer() { }

Trainer.prototype.train = function (brain, message, storage) {
	console.log(JSON.stringify(message, null, 2));

	let thingToRemember = message.body.event.text;
    
	this.askWho(message);

	
	// 	function (response, convo) {
	// 		convo.say(`Ok, I will remember "${thingToRemember}" for ${response.text}.`)
	// 		askHow(response, convo);
	// 		convo.next();
	// 	}, { 
	// 		key: 'who', 
	// 		multiple: false
	// 	});
	// };

	// var askHow = function (response, convo) {
	// 	convo.ask('I need some example phrases people will use to find this, say "done" to finish.',
	// 		function (response, convo) {
	// 			if (response.text.toLowerCase() == 'done') {
	// 				remember(response, convo);
	// 				convo.next();
	// 			}
	// 		}, { key: 'how', multiple: true });
	// };

	// var remember = function (response, convo) {
	// 	var storageContainer;
	// 	var storageId;

	// 	var responses = convo.extractResponses();
	// 	console.log(`responses.who = ${responses.who}`);

	// 	var who = responses.who.toLowerCase();
	// 	//TODO: Change to switch statement
	// 	if (who == "everyone") {
	// 		storageContainer = storage.teams;
	// 		storageId = message.body.team_id;
	// 	} else  {
	// 		storageContainer = storage.channels;
	// 		storageId = message.body.event.channel;
	// 	}
		
	// 	let fact = {
	// 		who: storageId,
	// 		what: thingToRemember, 
	// 		how: responses.how.split('\n').filter(function (x) { return x != 'done'; })
	// 	};

	// 	convo.say(`Fact:\n\`\`\`${JSON.stringify(fact, null, 2)}\`\`\``);

	// 	brain.remember(fact);

	// 	storageContainer.get(storageId, function (err, data) {
	// 		data = data || { id: storageId, facts: [] };
	// 		data.facts.push(fact);

	// 		storageContainer.save(data, function (err) {
	// 			message.respond("Got it!");
	// 		});
	// 	});
	// };

	// message.startConversation(message, askWho);
};

Trainer.prototype.handleWho = function (message, x, y) { 
	// console.log(`message:\n\`\`\`${JSON.stringify(message, null, 2)}\`\`\``); 
	// console.log(`x:\n\`\`\`${JSON.stringify(x, null, 2)}\`\`\``); 
	// console.log(`y:\n\`\`\`${JSON.stringify(y, null, 2)}\`\`\``); 
	console.log(`this: ${this}`);
	this.askHow(message); 
};
Trainer.prototype.handleHow = function (message, x, y) { this.remember(message); };

Trainer.prototype.askWho = function (message) {	
	message
		.say({
			text: 'Who should I remember this for?',
			attachments: [{
				text: '',
				fallback: 'Everyone or Channel?',
          		callback_id: 'handleWho',
				actions: [
					{ name: 'everyone', text: 'Everyone', type: 'button', value: 'everyone' },
					{ name: 'channel', text: 'Channel', type: 'button', value: 'channel' }
				]
			}]
		});
};

Trainer.prototype.askHow = function (message) {
	message
		.say({
			text: 'I need some example phrases people will use to find this, say "done" to finish.'
		});
};