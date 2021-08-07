const db = require('quick.db');

module.exports = {
  name: 'create',
	description: 'create',
	args: false,
	execute(message, args) {
    if(db.has(message.author.id)) {
      return message.channel.createMessage('Yo why bother you already have an account');
    }
    db.add(`${message.author.id}.bal`, 10);
    const bal = db.get(`${message.author.id}.bal`);
    message.channel.createMessage(`Done! ${message.author.mention}, you now have $${bal}`);
  }
}