const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "penis",
	category: "Fun",
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("penissize")
		.setDescription("imagine small pp😂🤣😂🤣🤣🤣😂")
		.addStringOption((option) => option.setName("target").setDescription("The target user").setRequired(false)),
	async execute(client, interaction) {
		var pp = ["=", "==", "===", "====", "=====", "======", "=======", "========", "=========", "=========="];
		var ppp = Math.floor(Math.random() * pp.length);

		var dickSize = "B";
		var dickMessage;

		for (var i = 0; i <= ppp; i++) {
			dickSize += "=";

			const dickEmbed = new EmbedBuilder().setTitle("Your dick size").setColor("Random").setDescription(`${dickSize}D`);

			if (interaction.options.getString("target")) {
				dickEmbed.setTitle(`${interaction.options.getString("target")}'s dick size`);
			}

			if (!dickMessage) {
				dickMessage = await interaction.reply({ embeds: [dickEmbed] });
			} else {
				await dickMessage.edit({ embeds: [dickEmbed] });
			}

			await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for 1 second before updating the message
		}
	},
};
