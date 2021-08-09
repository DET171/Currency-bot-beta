const db = require('quick.db');

module.exports = {
	name: 'bal',
	aliases: ['balance'],
	description: 'view ye balance',
	usage: '<user?>',
	args: false,
	execute(message, args) {
		if(!args.length) {
			const amt = db.get(`${message.author.id}.bal`);
			message.channel.createMessage({
				embed: {
					title: `${message.author.username}'s balance`,
					description: `**Wallet:** $${amt}`,
				},
			});
		}
	},
};
