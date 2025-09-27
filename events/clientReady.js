const { ActivityType } = require("discord.js");

module.exports = async (client) => {
	console.info("Ready!");
	//const guild = client.guilds.cache;
	//console.log(guild);

	client.user.setActivity(`meow! =3 =3 =3 - use /`, { type: 4 });
};
