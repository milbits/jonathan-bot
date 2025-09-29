const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "stop",
	data: new SlashCommandBuilder().setName("stop").setDescription("Stops playback"),
	execute(client, interaction) {
		if (!interaction.member.voice.channel)
			return interaction.reply({ content: `please join <#${queue.channel.id}>`, ephemeral: true, components: [] });

		if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Stop",
						description: "im currently used in a different vc ",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			});

		/*	if (!client.player.createQueue(interaction.guild).getQueue(interaction))
			return interaction.reply({
				embeds: {
					title: "Stop",
					description: "Nothing is playing",
					color: "#f04747",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			})
			*/

		const queue = client.player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return void interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Stop",
						description: "No music is being played",
						color: "f04747",
					},
				],
			});
		queue.destroy();
		return void interaction.reply({
			embeds: [
				{
					title: "Stop",
					description: "Stopped the player!",
					color: "43b581",
				},
			],
		});
	},
};
