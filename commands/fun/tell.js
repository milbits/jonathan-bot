const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "tell",
	botPerms: ["SEND_MESSAGES"],
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("tell")
		.setDescription("/say but with an embed!!!!!")
		.addStringOption((option) => option.setName("message").setDescription("the message to include").setRequired(true)),
	execute(client, interaction) {
		interaction.channel.send({
			embeds: [
				new EmbedBuilder()
					.setAuthor({
						name: `${interaction.member.displayName}`,
						iconURL: `${interaction.member.user.displayAvatarURL()}`,
						url: `https://discord.com/users/${interaction.user.id}`,
					})
					.setDescription(`${interaction.options.getString("message")}`)
					.setColor(`${interaction.member.displayHexColor}`),
			],
		});
		interaction.reply({ content: ":3c", ephemeral: true });
	},
};
