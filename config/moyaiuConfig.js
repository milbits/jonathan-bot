const { Collection } = require("discord.js");
module.exports = function (client, Player) {

	client.config = require("../config/config");
	client.commands = new Collection();
	client.filters = client.config.filters;
	client.buttonCommands = new Collection();

	client.dot = "<:dot:1279068583690764340>";
	client.play = "<:play:1279068434579062856>";
	client.skip = "<:next:1279068203578036235>";
	client.back = "<:back:1279068120341811262>";
	client.playlist = "<:playlist:1279067976578105385>";
	client.resume = "<:resume:1279068340727582753>";
};
