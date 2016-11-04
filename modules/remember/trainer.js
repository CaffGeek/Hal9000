'use strict';

module.exports = trainer;

var trainer = {
	train: function (brain, bot, message) {
		console.log(JSON.stringify(message, null, 2));

		let thingToRemember = message.match[1];

		var askWho = function (response, convo) {
			convo.ask('Should I remember this just for _you_, this _channel_, or _everyone_?',
				function (response, convo) {
					convo.say(`Ok, I will remember "${thingToRemember}" for ${response.text}.`)
					askHow(response, convo);
					convo.next();
				}, { key: 'who', multiple: false });
		};

		var askHow = function (response, convo) {
			convo.ask('I need some example phrases people will use to find this, say "done" to finish.',
				function (response, convo) {
					if (response.text == 'done') {
						remember(response, convo);
						convo.next();
					}
				}, { key: 'how', multiple: true });
		};

		var remember = function (response, convo) {
			var responses = convo.extractResponses();
			let fact = {
				what: thingToRemember,
				who: responses.who,
				how: responses.how.split('\n').filter(function (x) { return x != 'done'; })
			};

			convo.say(`Fact:\n\`\`\`${JSON.stringify(fact, null, 2)}\`\`\``);

			brain.remember(fact.what, fact.how);

			var storageContainer = controller.storage.users;
			var storageId = message.user;

			console.log(`responses.who = ${responses.who}`);

			if (responses.who == "everyone") {
				storageContainer = controller.storage.teams;
				storageId = message.team;
			} else if (responses.who == "channel") {
				storageContainer = controller.storage.channels;
				storageId = message.channel;
			}

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
}