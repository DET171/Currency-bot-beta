const db = require('quick.db');
const shop = new db.table('shop');
shop.set('🍪 Cookie.cost', 5);
shop.set('🍪 Cookie.type', 'collectable');
shop.set('🍪 Cookie.d', 'A random cookie found on the streets');

shop.set('☠ Poison.cost', 9000);
shop.set('☠ Poison.type', 'collectable');
shop.set('☠ Poison.d', 'Some cyanide that\'s only used for flexing');

shop.set('🍟 Fries.cost', 11);
shop.set('🍟 Fries.type', 'collectable');
shop.set('🍟 Fries.d', 'Some yummy fries from McDonald\'s');

shop.set('🔳 Emoji.cost', 1);
shop.set('🔳 Emoji.type', 'unsellable');
shop.set('🍪 Cookie.type', 'collectable');

shop.set('💵 Cash.cost', 100);
shop.set('💵 Cash.type', 'unbuyable');
shop.set('💵 Cash.d', 'Sell this for some quick cash');

shop.set('🎟 Ticket.cost', 30);
shop.set('🎟 Ticket.type', 'power-up');
shop.set('🎟 Ticket.d', 'Buy this scratch ticket and try your luck?');

module.exports = {
	name: 'shop',
	description: 'view da shop',
	args: false,
	shop,
	execute(message, args) {
		if(!args.length) {
			const shoplist = [];
			const shopll = shop.all();
			for (let i = 0; i < shopll.length; i++) {
				const currentItem = {
					name: shopll[i].ID,
					value: `${shopll[i].data.d}\nCost: \`$${shopll[i].data.cost}\` \n Type: \`${shopll[i].data.type}\` \n ID: \`${shopll[i].ID}\``,
					inline: false,
				};
				shoplist.push(currentItem);
			}
			message.channel.createMessage({
				embed: {
					title: 'Shop (Beta)',
					// description: shopl,
					fields: shoplist,
					footer: {
						text: '💸',
					},
				},
			});
		}
	},
};
