const fs = require("fs");
const { REST, Routes } = require("discord.js");
const commandss = [];
require("dotenv").config();

// const commandFiles = fs.readdirSync(`./test/${dirs}`).filter((files) => files.endsWith(".js"))

/*for (const file of commandFiles) {
	const command = require(`./commands/${dir}/${file}`)
	commands.push(command.data.toJSON())
}
*/
fs.readdirSync("./commands").forEach((dirs) => {
	const commands = fs.readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith(".js"));

	for (const file of commands) {
		const command = require(`./commands/${dirs}/${file}`);
		console.debug(command.name);
		commandss.push(command.data.toJSON());
	}
});

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
rest.put(Routes.applicationCommands(process.env.ID), { body: commandss })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
