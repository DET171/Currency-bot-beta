const db = require('quick.db');
const shop = new db.table('shop');
shop.set('🍪 Cookie.cost', 5);
shop.set('🍪 Cookie.type', 'collectable');
shop.set('☠ Poison.cost', 100);
shop.set('☠ Poison.type', 'collectable');
shop.set('🍟 Fries.cost', 11);
shop.set('🍟 Fries.type', 'collectable');
shop.set('🔳 Emoji.cost', 1);
shop.set('🔳 Emoji.type', 'unsellable');

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
					value: `Cost: \`$${shopll[i].data.cost}\` \n Type: \`${shopll[i].data.type}\` \n ID: \`${shopll[i].ID}\``,
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
