module.exports = {
	name: 'ping',
	description: 'pog',
	args: false,
	execute(message, args) {
		message.channel.createMessage('Pong!');
		console.log('hi');
	},
};
