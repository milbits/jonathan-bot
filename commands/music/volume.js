const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
	name: "volume",
	category: "Music",
	data: new SlashCommandBuilder()
		.setName("volume")
		.setDescription("Changes the volume")
		.addIntegerOption((option) => option.setName("volume").setDescription("volume").setRequired(true).setMinValue(1).setMaxValue(200)),
	async execute(client, interaction) {
		const queue = useQueue(interaction.guild.id);

		if (!interaction.member.voice.channel) return interaction.reply({ content: `please join <#${queue.channel.id}>`, ephemeral: true, components: [] });

		if (!queue) return interaction.reply("Nothing is playing");

		queue.node.setVolume(parseInt(interaction.options.getInteger("volume")));
		interaction.reply(`Changed volume to **${parseInt(interaction.options.getInteger("volume"))}%**`);

		/*const vol = args[0]
		if (!vol) return void interaction.reply({ content: `🎧 | Current volume is **${queue.volume}**%!` })
		if (vol.value < 0 || vol.value > 500)
			return void interaction.reply({ content: "❌ | Volume range must be 0-500" })
		const success = void interaction.reply({
			content: success ? `✅ | Volume set to **${vol.value}%**!` : "❌ | Something went wrong!",
		})
		*/
	},
};
