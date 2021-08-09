const ran = require('../utils');
const db = require('quick.db');

const loot = (id, min, max, item, itemUsed, chance) => {
	const d = Math.random() * 100;
	db.subtract(`${id}.inv.${itemUsed}`, 1);
	const itemAmt = db.get(`${id}.inv.${itemUsed}`);
	if(itemAmt <= 0) {
		db.delete(`${id}.inv.${itemUsed}`);
	}
	if(item) {
		chance = chance || 50;
		if(d < chance) {
			db.add(`${id}.inv.${item}`, 1);
		}
		const amt = ran.getRandomInt(min, max);
		db.add(`${id}.bal`, amt);
	}
	else {
		const amt = ran.getRandomInt(min, max);
		db.add(`${id}.bal`, amt);
	}
};

module.exports = {
	loot,
};
