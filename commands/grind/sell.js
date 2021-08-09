const { shop } = require('./shop.js');
const FuzzySearch = require('fuzzy-search');
const db = require('quick.db');

module.exports = {
	name: 'sell',
	description: 'sell something',
	usage: '<item>',
	args: true,
	cooldown: 2,
	execute(message, args) {
		const amt = parseInt(args[1]) || 1;
		const shoop = shop.all();
		const searcher = new FuzzySearch(shoop, ['ID']);
		const result = searcher.search(args[0]);
		const json = result;
		if(json[0].data.type == 'unsellable') {
			return message.channel.createMessage(`Uh oh, ${message.author.mention}! You can't sell unsellables!`);
		}

		const itemCurAmt = db.get(`${message.author.id}.inv.${json[0].ID}`) || 0;
		const inv = db.get(`${message.author.id}.inv`); // eslint-disable-line
		if(itemCurAmt < amt) {
			return message.channel.createMessage(`Hey ${message.author.mention}, you don't even have ${amt} ${json[0].ID}`);
		}
		// yeah this was hard to write and so will be hard to read for you
		db.subtract(`${message.author.id}.inv.${json[0].ID}`, amt);
		const itemAmt = db.get(`${message.author.id}.inv.${json[0].ID}`);
		if(itemAmt <= 0) {
			db.delete(`${message.author.id}.inv.${json[0].ID}`);
		}
		const itemCost = shop.get(`${json[0].ID}.cost`);
		const rawAmt = itemCost * 0.6;
		const refinedAmt = rawAmt.toFixed(0) * amt;
		db.add(`${message.author.id}.bal`, refinedAmt);
		message.channel.createMessage(`${message.author.mention}, you successfully sold ${json[0].ID} for $${refinedAmt}.`);
	},
};
