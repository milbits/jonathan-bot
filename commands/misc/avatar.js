const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "avatar",
	category: "Misc",
	data: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("grab an avatar")
		.addUserOption((option) => option.setName("target").setDescription("The target user").setRequired(false)),
	execute(client, interaction) {
		// embed
		var embed = new EmbedBuilder()
			.setTitle("Avatar")
			.setDescription(`${interaction.member}`)
			.setImage(`${interaction.member.user.displayAvatarURL({ extension: "png", size: 4096, dynamic: true })}`);

		// if the user selected a target, change the description and image to the target
		if (interaction.options.getUser("target")) {
			embed
				.setImage(`${interaction.options.getUser("target").displayAvatarURL({ extension: "png", size: 4096, dynamic: true })}`)
				.setDescription(`${interaction.options.getUser("target")}`);
		}

		interaction.reply({
			embeds: [embed],
		});
	},
};
