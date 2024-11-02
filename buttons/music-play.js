const { useQueue } = require("discord-player");
const { ButtonBuilder } = require("discord.js");
const { ActionRowBuilder } = require("discord.js");

module.exports = {
	name: "music-play",
	async execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!queue || !queue.isPlaying()) return interaction.reply({ content: `❌ | theres no music currently playing`, ephemeral: true, components: [] });
		if (!interaction.member.voice.channel) return interaction.reply({ content: `please join <#${queue.channel.id}>`, ephemeral: true, components: [] });

		if (interaction.guild.members.me.voice.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
			return interaction.reply({ content: `❌ | You are not on the same audio channel as me.`, ephemeral: true, components: [] });

		let playing = !queue.node.isPaused();

		if (playing) queue.node.pause();
		else queue.node.resume();

		const backButton = new ButtonBuilder().setCustomId("music-back").setEmoji("<:back:1153666982059716628>").setStyle("Secondary");
		const playPauseButton = new ButtonBuilder()
			.setCustomId("music-play")
			.setEmoji(playing ? "<:play:1153663186973753364>" : "<:pause:1153663836180717568>")
			.setStyle(playing ? "Primary" : "Secondary");
		const skipButton = new ButtonBuilder().setCustomId("music-skip").setEmoji("<:skip:1153667602791546900>").setStyle("Secondary");
		const queueButton = new ButtonBuilder().setCustomId("music-queue").setEmoji("<:queue:1153660764100509706>").setStyle("Secondary");

		const musicButtonRow = new ActionRowBuilder().addComponents(backButton, playPauseButton, skipButton, queueButton);
		await interaction.update({ components: [musicButtonRow] });
	},
};
