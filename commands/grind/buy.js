const db = require('quick.db');
const { shop } = require('./shop.js');
const FuzzySearch = require('fuzzy-search');

module.exports = {
	name: 'buy',
	description: 'buy something',
	args: true,
	usage: '<item> <amount?>',
	execute(message, args) {
		const item = args[0];
		const amt = parseInt(args[1]) || 1;
		const shoop = shop.all();
		const searcher = new FuzzySearch(shoop, ['ID']);
		try {
			const result = searcher.search(item);
			if(result[0].data.type == 'unbuyable') {
				return message.channel.createMessage(`${message.author.mention}, you cannot buy \`unbuyables\`!`);
			}
			const res = parseInt(result[0].data.cost);
			if(db.get(`${message.author.id}.bal`) < res * amt) return message.channel.createMessage('Hey you don\'t even have enough money LMAO');
			db.subtract(`${message.author.id}.bal`, res * amt);
			db.add(`${message.author.id}.inv.${result[0].ID}`, amt);
			message.channel.createMessage(`${message.author.mention}, you succesfully bought **${amt} ${result[0].ID}(s)**`);
		}
		catch(e) {
			console.warn(e);
			return message.channel.createMessage('Sorry, that item fails to exist. Could you try another one or type in the full name?');
		}
		/* if(!shop.get(item)) {

		} */
		// const res = shop.get(item);

	},
};
