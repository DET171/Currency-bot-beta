const db = require('quick.db');

module.exports = {
	name: 'inv',
  aliases: ['inventory'],
	description: 'view ye inventory',
	args: false,
	execute(message, args, client, prefix) {
		if(!db.has(`${message.author.id}.inv`)) {
      return message.channel.createMessage('Your inventory is empty. Type `' + prefix + 'shop` to view some items.')
    }
    let invdisp = [];
    const inv = db.get(`${message.author.id}.inv`);
    for(i in inv) {
      let str = `${inv[i]} ${i}(s) \n`;
      invdisp.push(str);
    }
    const invstr = invdisp.join('\n');
    message.channel.createMessage({
      embed: {
        title: `${message.author.username}'s inventory`,
        description: invstr
      }
    })
	},
};