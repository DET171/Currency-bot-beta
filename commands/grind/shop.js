const db = require('quick.db');
const shop = new db.table('shop');
shop.set('cookie', 5);
shop.set('poison', 100);
shop.set('fries', 11);

module.exports = {
	name: 'shop',
	description: 'view da shop',
	args: false,
	shop,
	execute(message, args) {
		const shopl = [
			'🍪 Cookie --- $5',
			'☠  Poison --- $100',
			'🍟 Fries --- $11',
		].join('\n');
		message.channel.createMessage({
			embed: {
				title: 'Shop (Beta)',
				description: shopl,
				footer: {
					text: '💸',
				},
			},
		});
	},
};
