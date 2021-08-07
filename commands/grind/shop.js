const db = require('quick.db');
const shop = new db.table('shop');
shop.set('cookie', 5);
shop.set('poison', 100);

module.exports = {
	name: 'shop',
	description: 'view da shop',
	args: false,
	shop,
	execute(message, args) {
		const shop = [
			'🍪 Cookie --- $5',
			'☠  Poison --- $100',
		].join('\n');
		message.channel.createMessage({
			embed: {
				title: 'Shop (Beta)',
				description: shop,
				footer: {
					text: '💸',
				},
			},
		});
	},
};