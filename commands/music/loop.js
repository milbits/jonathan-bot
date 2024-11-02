const { SlashCommandBuilder } = require("discord.js");
const { useQueue, QueueRepeatMode } = require("discord-player");

module.exports = {
	name: "loop",
	category: "Music",
	data: new SlashCommandBuilder()
		.setName("loop")
		.setDescription("Loops a song, queue or enables autoplay")
		.addIntegerOption((option) =>
			option
				.setName("mode")
				.setDescription("Choose which type of loop")
				.setRequired(true)
				.addChoices(
					{ name: "Song", value: QueueRepeatMode.TRACK },
					{ name: "Queue", value: QueueRepeatMode.QUEUE },
					{ name: "Autoplay", value: QueueRepeatMode.AUTOPLAY },
					{ name: "❌ Disable", value: QueueRepeatMode.OFF }
				)
		),

	execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);
		const loopmode = interaction.options.getInteger("mode");

		if (!interaction.member.voice.channel) return interaction.reply({ content: `please join <#${queue.channel.id}>`, ephemeral: true });

		const modename =
			loopmode === QueueRepeatMode.TRACK
				? "the **current track**"
				: loopmode === QueueRepeatMode.QUEUE
				? "the **entire queue**"
				: loopmode === QueueRepeatMode.AUTOPLAY
				? "**Autoplay**"
				: "**off**";

		queue.setRepeatMode(loopmode);
		interaction.reply(`Loop set to ${modename}! :3`);

		/*	if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" })
		const loopMode = interaction.options.get("mode").value
		const success = queue.setRepeatMode(loopMode)
		const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶"
		return void interaction.followUp({
			content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!",
		})
		*/
	},
};
