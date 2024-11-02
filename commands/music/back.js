const { SlashCommandBuilder } = require("discord.js");
const { useHistory } = require("discord-player");
module.exports = {
	name: "back",
	category: "Music",
	data: new SlashCommandBuilder().setName("back").setDescription("Goes back to the previous track"),
	async execute(client, interaction) {
		const history = useHistory(interaction.guild.id);
		await history.previous();

		interaction.reply(`Playing previous song`);
	},
};
