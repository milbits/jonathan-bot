const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "pause",
	data: new SlashCommandBuilder().setName("resume-pause").setDescription("Resume or pause"),
	async execute(client, interaction) {
		const queue = await client.player.createQueue(interaction.guild, {
			metadata: interaction.channel,
		});
		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Pause",
						description: "join a vc",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			});

		if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Pause",
						description: "im currently used in a different vc ",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			});

		if (!queue || !queue.playing)
			return interaction.reply({
				embeds: [
					{
						title: "Pause",
						description: "Nothing is playing",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			});

		if (queue.paused)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Pause",
						description: "The song is already paused",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			});

		interaction.reply({});

		//if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" })
		queue.setPaused(true);
		//	return interaction.followUp({ content: success ? "⏸ | Paused!" : "❌ | Something went wrong!" })
	},
};
