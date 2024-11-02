const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "music-skip",
	async execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!queue || !queue.isPlaying()) return interaction.reply({ content: `❌ | theres no music currently playing`, ephemeral: true, components: [] });

		if (!interaction.member.voice.channel) return interaction.reply({ content: `please join <#${queue.channel.id}>`, ephemeral: true, components: [] });

		if (interaction.guild.members.me.voice.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
			return interaction.reply({ content: `❌ | You are not on the same channel as me`, ephemeral: true, components: [] });

		if (queue.repeatMode === 1) {
			queue.setRepeatMode(0);
			queue.node.skip();
			await wait(500);
			queue.setRepeatMode(1);
		} else {
			queue.node.skip();
		}

		track = queue.currentTrack;

		interaction.reply(`Skipped by ${interaction.user}`);
	},
};
