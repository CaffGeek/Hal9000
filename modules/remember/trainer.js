'use strict';

module.exports = Trainer;

function Trainer() { }

Trainer.prototype.train = function (brain, bot, message, controller) {
	console.log(JSON.stringify(message, null, 2));

	let thingToRemember = message.match[1];

	var askWho = function (response, convo) {		
		convo.ask({
				attachments:[{
					title: 'Should I remember this just for this _channel_, or _everyone_?',
					callback_id: '123', //TODO: What is this?
					attachment_type: 'default',
					actions: [
						{
							"name": "everyone",
							"text": "Everyone",
							"value": "everyone",
							"type": "button"
						},
						{
							"name": "channel",
							"text": "Channel",
							"value": "channel",
							"type": "button"
						}
					]
				}]
			},
			function (response, convo) {
				convo.say(`Ok, I will remember "${thingToRemember}" for ${response.text}.`)
				askHow(response, convo);
				convo.next();
			}, { 
				key: 'who', 
				multiple: false
			});
	};

	var askHow = function (response, convo) {
		convo.ask('I need some example phrases people will use to find this, say "done" to finish.',
			function (response, convo) {
				if (response.text.toLowerCase() == 'done') {
					remember(response, convo);
					convo.next();
				}
			}, { key: 'how', multiple: true });
	};

	var remember = function (response, convo) {
		var storageContainer;
		var storageId;

		var responses = convo.extractResponses();
		console.log(`responses.who = ${responses.who}`);

		var who = responses.who.toLowerCase();
		//TODO: Change to switch statement
		if (who == "everyone") {
			storageContainer = controller.storage.teams;
			storageId = message.team;
		} else  {
			storageContainer = controller.storage.channels;
			storageId = message.channel;
		}
		
		let fact = {
			who: storageId,
			what: thingToRemember, 
			how: responses.how.split('\n').filter(function (x) { return x != 'done'; })
		};

		convo.say(`Fact:\n\`\`\`${JSON.stringify(fact, null, 2)}\`\`\``);

		brain.remember(fact);

		storageContainer.get(storageId, function (err, data) {
			data = data || { id: storageId, facts: [] };
			data.facts.push(fact);

			storageContainer.save(data, function (err) {
				bot.reply(message, "Got it!");
			});
		});
	};

	bot.startConversation(message, askWho);
}