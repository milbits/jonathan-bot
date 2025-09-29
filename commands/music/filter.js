const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
	name: "filter",
	category: "Music",
	cooldown: 15,
	data: new SlashCommandBuilder()
		.setName("filter")
		.setDescription('[EXPERIMENTAL] Use "cool" music effects! Only one at a time')
		.addStringOption((option) =>
			option
				.setName("filter")
				.setDescription("The Filter to toggle")
				.setRequired(true)
				// .addChoice("8D", "8d")
				.addChoices(
					{ name: "❌ Disable Filters", value: "disable" },
					{ name: "Vibrato", value: "vibrato" },
					{ name: "Pulsator", value: "pulsator" },
					{ name: "8D", value: "8d" },
					{ name: "Bass Boost", value: "bassboost" },
					{ name: "Vaporwave", value: "vaporwave" },
					{ name: "Nightcore", value: "nightcore" },
					{ name: "Daycore", value: "daycore" },
					{ name: "Ultra Bass Boost", value: "ultrabass" },
					{ name: "Drugs", value: "drugs" },
					//	{ name: "Underwater", value: "dim" },
					{ name: "Reverb", value: "reverb" }
				)
		),
	async execute(client, interaction) {
		const queue = useQueue(interaction.guild.id).filters.ffmpeg;
		const input = interaction.options.getString("filter");

		switch (input) {
			case "8d":
				queue.setFilters(["8D"]);
				return;
			case "disable":
				interaction.reply("Disabled filters");

				queue.toggle(queue.getFiltersEnabled());
				queue.setFilters();

				return;
		}

		const filters = [];

		queue.getFiltersEnabled().map((x) => filters.push(x));
		queue.getFiltersDisabled().map((x) => filters.push(x));

		const filter = filters.find((x) => x.toLowerCase() === input);

		/*if (timestamp.progress == "Infinity")-
			interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Filter",
						description: "You cant apply filters in a live video",
					},
				],
			});*/

		queue.toggle([`${filter}`]);
		interaction.reply(`${queue.getFiltersEnabled().includes(filter) ? "Enabled" : "Disabled"} filter **${filter}**.`);
	},
};
