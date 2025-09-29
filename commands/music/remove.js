const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "remove",
	data: new SlashCommandBuilder()
		.setName("remove")
		.setDescription("Removes a song from the queue")
		.addIntegerOption((option) => option.setName("song").setDescription("The song to remove (queue number)").setRequired(true)),
	execute(client, interaction) {
		const queue = useQueue();

		if (queue.tracks.length < 2) return interaction.reply("there's nothing to remove");

		if (isNaN(interaction.options.getInteger("song")))
			return interaction.reply(`use a queue number between 1 to ${queue.tracks.length - 1}\nuse /queue if you're confused`);

		if (Number(interaction.options.getInteger("song")) === 0) {
			queue.node.skip();
			return interaction.reply("skipped song. ever heard of /skip? go try it");
		}

		if (
			Number(interaction.options.getInteger("song")) >= queue.tracks.length ||
			Number(interaction.options.getInteger("song")) < 1 ||
			!queue.tracks[interaction.options.getInteger("song")]
		)
			return interaction.reply("This is not in the queue");

		const song = queue.tracks[Number(interaction.options.getInteger("song"))];

		queue.remove(Number(interaction.options.getInteger("song") - 1));

		interaction.reply(`Removed **${song.title}** from the Queue`);

	},
};
