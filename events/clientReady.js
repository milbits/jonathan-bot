const { ActivityType } = require("discord.js");

module.exports = async (client) => {
	console.info("Ready!");
	//const guild = client.guilds.cache;
	//console.log(guild);

	client.user.setActivity(`woof! =3`, { type: 4 });
};
