const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "eval",
	category: "Dev",
	data: new SlashCommandBuilder()
		.setName("eval")
		.setDescription("dev-only command")
		.addStringOption((option) => option.setName("script").setDescription("the javascript").setRequired(true)),
	async execute(client, interaction) {
		if (interaction.user.id != "525379333951324190") return;
		var evaluation = eval(interaction.options.getString("script"));
		evaluation;
		interaction.reply({
			embeds: [new EmbedBuilder().setDescription(`${interaction.options.getString("script")}\n\n\`\`\`shell\n${evaluation}\n\`\`\``)],
		});
	},
};
