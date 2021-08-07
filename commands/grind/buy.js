const db = require('quick.db');
const { shop } = require('./shop.js');

module.exports = {
	name: 'buy',
	description: 'buy something',
	args: true,
	usage: 'buy <item>',
	execute(message, args) {
		console.log(shop);
	},
};
