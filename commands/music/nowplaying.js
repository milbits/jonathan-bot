const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
module.exports = {
	name: "nowplaying",
	category: "Music",
	data: new SlashCommandBuilder().setName("nowplaying").setDescription("Shows info about the current song"),
	execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!queue.connection) return interaction.reply({ content: "nothing is playing bro", ephemeral: true });

		const track = queue.currentTrack;
		const filters = [];
		//const timestamp = queue.getTimestamp(0);
		//const trackDuration = timestamp.progress == "Infinity" ? "Live" : track.duration

		let playing = queue.node.isPaused();
		const backButton = new ButtonBuilder().setCustomId("music-back").setEmoji(client.back).setStyle("Secondary");
		const playPauseButton = new ButtonBuilder()
			.setCustomId("music-play")
			.setEmoji(playing ? client.play : client.pause)
			.setStyle("Secondary");
		const skipButton = new ButtonBuilder().setCustomId("music-skip").setEmoji(client.skip).setStyle("Secondary");
		//		const loopButton = new ButtonBuilder().setCustomId("music-loop").setEmoji("<:loop:1127601962444128336>").setStyle("Secondary");
		const musicButtonRow = new ActionRowBuilder().addComponents(backButton, playPauseButton, skipButton);

		const embed = new EmbedBuilder()
			.setColor("Random")
			.setAuthor({ name: "Now Playing", url: `${track.url}` })
			.setTitle(`${track.author} - ${track.title}`)
			.setURL(`${track.url}`)
			.setThumbnail(`${track.thumbnail}`)
			.setFooter({
				text: `Added by ${track.requestedBy.username}`,
				iconURL: `${track.requestedBy.displayAvatarURL()}`,
			})
			.addFields([
				{
					name: "Volume",
					value: `${queue.node.volume}`,
					inline: true,
				},
				{
					name: "Loop",
					value: `${queue.repeatMode ? "Enabled" : "Disabled"}`,
					inline: true,
				},
				/*	{
					name: "Auto Play",
					value: `${queue.autoPlay ? "Enabled" : "Disabled"}`,
					inline: true,
				},*/

				{
					name: "\u200b",
					value: `${queue.node.createProgressBar({
						timecodes: true,
						indicator: client.dot,
						length: 15,
					})}`,
					inline: false,
				},
			]);

		interaction.reply({
			embeds: [embed],
			components: [musicButtonRow],
		});
	},
};
