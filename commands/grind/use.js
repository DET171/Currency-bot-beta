const use = require('../../use');
const db = require('quick.db');

module.exports = {
	name: 'use',
	description: 'use an item you own',
	args: true,
	usage: '<item>',
	execute(message, args) {
		const item = args.join(' ');
		const inv = db.get(`${message.author.id}.inv`);
		if(item == 'ticket' || item == '🎟 Ticket') {
			if(!inv.hasOwnProperty('🎟 Ticket')) { // eslint-disable-line
				return message.channel.createMessage(`${message.author.mention}, you don't have a 🎟 Ticket!`);
			}
			use.loot(message.author.id, 5, 20, '💵 Cash', '🎟 Ticket', 30);
			message.channel.createMessage(`${message.author.mention}, you successfully used a 🎟 Ticket!`);
		}
	},
};
