const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const { timeToSeconds } = require("../../utils/timeToSeconds");
module.exports = {
	name: "seek",
	category: "Music",
	data: new SlashCommandBuilder()
		.setName("seek")
		.setDescription("[EXPERIMENTAL] Jump to a specific time in the current track")
		.addStringOption((option) => option.setName("position").setDescription("Accepted formats: '4h20m10s' and '4:20:10'").setRequired(true)),
	async execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);
		const track = queue.currentTrack;
		const time = timeToSeconds(`${interaction.options.getString("position")}`) * 1000;

		if (isNaN(time) || time === "Infinity" || Number(time) < 0 || time >= track.durationMS)
			return interaction.reply("Enter a correct timestamp");

		if (!interaction.member.voice.channel) return interaction.reply({ content: "Join a vc", ephemeral: true });

		queue.node.seek(time);
		interaction.reply(`Seeking to **${interaction.options.getString("position")}**`);
	},
};
