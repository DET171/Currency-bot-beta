/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
const getRandomFloat = (min, max) => {
	return Math.random() * (max - min) + min;
};

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Get a random boolean value.
 *
 * @return {boolean} a random true/false
 */
const getRandomBool = () => {
	return Math.random() >= 0.5;
};

module.exports = {
	getRandomInt,
	getRandomBool,
	getRandomFloat,
};
