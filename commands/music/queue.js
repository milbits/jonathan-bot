const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { useQueue, QueueRepeatMode } = require("discord-player");

module.exports = {
	name: "queue",
	category: "Music",
	data: new SlashCommandBuilder().setName("queue").setDescription("shows all upcoming songs"),
	async execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);

		let currQueue = queue.tracks.toArray();
		let queueLength = currQueue.length;
		let loopMode = queue.repeatMode;
		let maxSongs = queueLength > 50 ? 50 : queueLength;
		let queueTracks = "`No songs in queue`";
		loopMode =
			loopMode === QueueRepeatMode.TRACK ? ":repeat_one: Track" : loopMode === QueueRepeatMode.QUEUE ? "Queue" : ":arrow_forward: Off";
		if (queueLength > 0) {
			currQueue = queueLength > maxSongs ? currQueue.slice(0, maxSongs) : currQueue;
			queueTracks = currQueue.map((track, idx) => `${++idx}. ${track.author} - ${track.toHyperlink()} | ${track.requestedBy}`).join("\n");
			while (queueTracks.length > 1000) {
				maxSongs--;
				currQueue = queueLength > maxSongs ? currQueue.slice(0, maxSongs) : currQueue;
				queueTracks = currQueue
					.map((track, idx) => `${++idx}.  ${track.author} - ${track.toHyperlink()} | ${track.requestedBy}`)
					.join("\n");
			}
			if (queueLength > maxSongs) {
				queueTracks += `\nand ${queueLength - maxSongs} more...`;
			}
		}

		let queueEmbed = new EmbedBuilder()
			.setColor("Green")
			.setTitle("Queue")
			.addFields(
				{
					name: ":musical_note: Now Playing",
					value: `**${queue.currentTrack.toHyperlink()}**\n${queue.node.createProgressBar({
						timecodes: true,
						indicator: `${client.dot}`,
						length: 6,
					})}`,
					inline: true,
				},

				{
					name: "🔁 Loop Mode",
					value: loopMode,
					inline: true,
				},
				{
					name: "➡️ Queue",
					value: queueTracks,
					inline: false,
				}
			);
		await interaction.reply({
			embeds: [queueEmbed],
		});
	},
};
