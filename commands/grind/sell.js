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
		// const amt = parseInt(args[1]);
		const shoop = shop.all();
		const searcher = new FuzzySearch(shoop, ['ID']);
		const result = searcher.search(args[0]);
		const json = result;
		if(json[0].data.type == 'unsellable') {
			return message.channel.createMessage(`Uh oh, ${message.author.mention}! You can't sell unsellables!`);
		}
		console.log(json[0].ID);
		const inv = db.get(`${message.author.id}.inv`);
		if(!inv.hasOwnProperty(json[0].ID)) { // eslint-disable-line
			return message.channel.createMessage('Yo you don\'t even own that item');
		}
		db.subtract(`${message.author.id}.inv.${json[0].ID}`, 1);
		const itemCost = shop.get(`${json[0].ID}.cost`);
		const rawAmt = itemCost * 0.6;
		const refinedAmt = rawAmt.toFixed(0);
		db.add(`${message.author.id}.bal`, refinedAmt);
		message.channel.createMessage(`${message.author.mention}, you successfully sold ${json[0].ID} for $${refinedAmt}.`);
	},
};
