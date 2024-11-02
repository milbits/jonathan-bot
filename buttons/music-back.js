const { useQueue, useHistory } = require("discord-player");

module.exports = {
	name: "music-back",
	async execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!queue || !queue.isPlaying()) return interaction.reply({ content: `the queue was already destroyed`, ephemeral: true, components: [] });

		if (!interaction.member.voice.channel) return interaction.reply({ content: `please join <#${queue.channel.id}>`, ephemeral: true, components: [] });

		if (interaction.guild.members.me.voice.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
			return interaction.reply({ content: `❌ | You are not on the same audio channel as me.`, ephemeral: true, components: [] });

		const history = useHistory(interaction.guild.id);
		await history.previous();

		interaction.reply(`Playing previous song | ${interaction.user}`);
	},
};
