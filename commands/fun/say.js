const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "say",
	category: "Fun",
	cooldown: 10,
	botPerms: ["SEND_MESSAGES"],
	data: new SlashCommandBuilder()
		.setName("say")
		.setDescription("let the bot say something. your message is logged")
		.addStringOption((option) => option.setName("message").setDescription("the message to send").setRequired(true)),
	execute(client, interaction) {
		console.info(`say | ${interaction.member.displayname}: ${interaction.options.getString("message")}\nserver: ${interaction.guild.id}`);
		if (!interaction.options.getString("message"))
			return interaction.reply({
				embeds: [u],
			});
		interaction.channel.send(interaction.options.getString("message"));
		interaction.reply({ content: "message sent", ephemeral: true });
	},
};
