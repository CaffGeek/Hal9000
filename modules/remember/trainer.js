'use strict';

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

Trainer.prototype.askWho = function (message, state) {
	message
		.say({
			text: 'Who should I remember this for?',
			attachments: [{
				text: '',
				fallback: 'Everyone or Channel?',
          		callback_id: 'handle_who_callback',
				actions: [
					{ name: 'everyone', text: 'Everyone', type: 'button', value: 'everyone' },
					{ name: 'channel', text: 'Channel', type: 'button', value: 'channel' }
				]
			}]
		})
		.route('handleWho', state, 60);
};

Trainer.prototype.handleWho = function (message, state) {
	message.respond('debug in handleWho');
	//TODO: show selection
    //TODO: hide buttons somehow
};

Trainer.prototype.askHow = function (message, state) {
	message.respond('I need some example phrases people will use to find this, say "done" to finish.');
};

Trainer.prototype.handleHow = function (message, state) {
	//Something to check for "done"
};

Trainer.prototype.remember = function (message, state) {
	message
		.say({
			text: 'I need some example phrases people will use to find this, say "done" to finish.'
		});
};