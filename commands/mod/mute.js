const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const parse = require("parse-duration");

module.exports = {
	name: "mute",
	category: "Mod",
	perms: ["MODERATE_MEMBERS"],
	botPerms: ["MODERATE_MEMBERS"],
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Timeout/Mute someone with a custom duration!")
		.addUserOption((option) => option.setName("target").setDescription("The target user").setRequired(true))
		.addStringOption((option) => option.setName("duration").setDescription("The duration of the mute").setRequired(true))
		.addStringOption((option) => option.setName("reason").setDescription("The reason for the mute").setRequired(false)),

	async execute(client, interaction) {
		const target = interaction.options.getUser("target");
		const duration = parse(`${interaction.options.getString("duration")}`, "ms");
		const reason = interaction.options.getString("reason");

		var embed = new EmbedBuilder().setTitle("Mute").setDescription(`Muted ${target} for **${interaction.options.getString("duration")}**`);

		if (Number(duration) < 0) {
			embed.setDescription("Enter a correct duration");
		}
		// if the duration is higher than 28 days
		if (duration > 2419200000) {
			interaction.guild.members.cache.get(target.id).timeout(interaction.guild.members.cache.get(target.id).timeout(2419200000, reason).then(console.log).catch(console.error));
			embed.setDescription(`Muted ${target} for **1 month**`);
		}

		interaction.reply({
			embeds: [embed],
		});
		// mute the target
		interaction.guild.members.cache.get(target.id).timeout(duration, reason).catch(console.error);
	},
};
