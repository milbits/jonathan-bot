const { useQueue } = require("discord-player");
const { useHistory } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "skip",
	category: "Music",
	data: new SlashCommandBuilder().setName("skip").setDescription("Skip to the next song"),
	execute(client, interaction) {
		const queue = useQueue();

		if (!interaction.member.voice.channel) return interaction.reply({ content: `please join <#${queue.channel.id}>`, ephemeral: true, components: [] });

		if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id)
			return interaction.reply(`im used in <#${queue.channel.id}>`);

		if (!queue) return interaction.reply("Nothing is playing");

		const currentTrack = queue.currentTrack;
		const success = queue.node.skip();
		const embed = new EmbedBuilder()
			.setColor("43b581")
			.setDescription(success ? `Skipped **${currentTrack.toHyperlink()}**!` : "Something went wrong!")
			.setTitle("Skip");

		interaction.reply({ embeds: [embed] });
	},
};
