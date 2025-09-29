const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "music-skip",
	async execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!queue || !queue.isPlaying())
			return interaction.reply({ content: `❌ | there's no music playing`, ephemeral: true, components: [] });

		if (
			!interaction.member.voice.channel ||
			(interaction.guild.members.me.voice.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
		)
			return interaction.reply({ content: `please join <#${queue.channel.id}>`, ephemeral: true, components: [] });

		if (queue.repeatMode === 1) {
			queue.setRepeatMode(0);
			queue.node.skip();
			await wait(2000);
			queue.setRepeatMode(1);
		} else {
			queue.node.skip();
		}

		track = queue.currentTrack;

		interaction.reply(`Skipped by ${interaction.user}`);
	},
};
