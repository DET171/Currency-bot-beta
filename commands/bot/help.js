module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: 'command ?<name>',
	cooldown: 0,
	async execute(message, args, client, prefix) {
    const bot = message.channel.client;
    const dmchannel = await bot.getDMChannel(message.author.id);
		const data = [];
		const { commands } = message.channel.client;
		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
	    data.push(commands.map(command => command.name).join(', '));
	    data.push(`\nYou can send \`${prefix}help <command name>\` to get info on a specific command!`);
	    return dmchannel.createMessage(data.join('\n'))
		    .then((msg) => {
			    if (!msg.channel.type === 'dm') return;
					message.channel.createMessage(message.author.mention + ', I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.channel.createMessage(message.author.mention + ', it seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.createMessage(data, { split: true });
	},
};