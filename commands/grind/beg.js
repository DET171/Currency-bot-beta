const got = require('got');
const db = require('quick.db');

module.exports = {
	name: 'beg',
	description: 'go begging you beggar',
	args: false,
	cooldown: 10,
	async execute(message, args) {
		const result = await got('https://randomuser.me/api/');
		const person = JSON.parse(result.body);
		const name = person.results[0].name.first + ' ' + person.results[0].name.last;
		const amount = Math.floor(Math.random() * 30) + 1;
		db.add(`${message.author.id}.bal`, amount);
		message.channel.createMessage({
			embed: {
				title: name,
				description: `${message.author.mention}, you went begging and found $${amount}!`,
				footer: {
					text: '😏',
				},
			},
		});
	},
};