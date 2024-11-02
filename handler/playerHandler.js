const fs = require("fs");
const player = fs.readdirSync("./player").filter((file) => file.endsWith(".js"));
const { Player } = require("discord-player");

module.exports = function (client, message) {
	for (const file of player) {
		const event = require(`../player/${file}`);
		console.log(`| ${file} | ✅`);
		player.events.on(file.split(".")[0], event.bind(null, client));
	}
};
