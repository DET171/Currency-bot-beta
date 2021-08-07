const fs = require('fs');

module.exports = {
  name: 'ping',
	description: 'pog',
	args: false,
	execute(message, args, bot) {
    message.channel.createMessage('Pong!');
    console.log('hi');
  }
}