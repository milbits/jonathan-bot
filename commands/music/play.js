const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useMainPlayer } = require("discord-player");
const player = useMainPlayer();

module.exports = {
	name: "play",
	category: "Music",
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song")
		.addStringOption((option) => option.setName("song").setDescription("A url or title").setAutocomplete(true).setRequired(true)),
	async autocomplete(client, interaction) {
		const query = interaction.options.getString("song", true);
		const searchResults = await player.search(query);

		let response = [];

		response = searchResults.tracks.slice(0, 10).map((track) => {
			if (track.url.length > 100) {
				track.url = track.title.slice(0, 100);
			}
			return {
				name: `${track.title} [By: ${track.author}]`.length > 100 ? `${track.title}`.slice(0, 100) : `${track.title} | ${track.author}`,
				value: track.url,
			};
		});

		if (!response || response.length === 0) {
			return interaction.respond([]);
		}
		return interaction.respond(response);
	},
	async execute(client, interaction) {
		if (!interaction.member.voice.channel) return interaction.reply({ content: `go join a vc first`, ephemeral: true });

		// music

		await interaction.deferReply();

		const query = interaction.options.getString("song", true);

		const { URL } = require("url");

		const isValidUrl = (str) => {
			try {
				new URL(str);
				return true;
			} catch (err) {
				return false;
			}
		};
		var queryType = "auto";

		const searchResult = await player.search(query, {
			// Force youtube search
			requestedBy: interaction.member,
			searchEngine: queryType,
		});

		const channel = interaction.member.voice.channel;

		const track = searchResult.tracks[0];

		var embed = new EmbedBuilder().setTitle("Play").setColor("DarkGreen");
		try {
			await player.play(channel, track, {
				nodeOptions: {
					leaveOnEmpty: true,
					leaveOnEmptyCooldown: 300000,
					skipOnNoStream: true,
					metadata: {
						interaction: interaction,
						channel: interaction.channel,
						client: interaction.client,
						requestedBy: interaction.user,
						track: searchResult.tracks[0],
					}, // we can access this metadata object using queue.metadata later
				},
			});

			return interaction.editReply({
				embeds: [
					embed
						.setDescription(`Added **${track.toHyperlink()}** by **${track.author}**\n Length: ${track.duration}`)
						.setThumbnail(`${track.thumbnail}`),
				],
			});
		} catch (error) {
			embed.setTitle("stupid error").setDescription(`Logs:\n \`\`\`js\n${error}\`\`\``).setColor("Red");

			await interaction.editReply({ embeds: [embed] });

			console.error(error);
		}
	},
};
