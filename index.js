// imports
const { Client, GatewayIntentBits, Discord } = require("discord.js");
const { Player } = require("discord-player");
require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const { Options } = require("discord.js");
const { DefaultExtractors } = require("@discord-player/extractor");
const { YoutubeiExtractor } = require("discord-player-youtubei");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
	FailIfNotExist: false,
	sweepers: Options.DefaultSweeperSettings,
	makeCache: Options.cacheWithLimits({
		MessageManager: 0,
		GuildBanManager: 0,
		ReactionManager: 0,
		ReactionUserManager: 0,
		StageInstanceManager: 0,
		ThreadManager: 0,
		ThreadMemberManager: 0,
		InviteManager: 0,
	}),
});
const player = new Player(client);
player.extractors.loadMulti(DefaultExtractors);
player.extractors.register(YoutubeiExtractor, {
	//fixes playback
	streamOptions: {
		useClient: "WEB_EMBEDDED",
	},
	generateWithPoToken: true,
	innertubeConfigRaw: {
		player_id: "0004de42",
	},
	//optional
	cookie: process.env.YT_COOKIE,
});

exports.client = client;
client.login(process.env.TOKEN);
require("./config/moyaiuConfig")(client, Player, Discord); // config

const { ButtonBuilder } = require("discord.js");
const { ActionRowBuilder } = require("discord.js");

// message whenever a song starts

player.events.on("playerStart", (queue, track) => {
	let playing = queue.node.isPaused();

	const backButton = new ButtonBuilder().setCustomId("music-back").setEmoji(client.back).setStyle("Primary");
	const playPauseButton = new ButtonBuilder()
		.setCustomId("music-play")
		.setEmoji(playing ? `${client.play}` : client.resume)
		.setStyle(playing ? "Primary" : "Success");
	const skipButton = new ButtonBuilder().setCustomId("music-skip").setEmoji(client.skip).setStyle("Primary");
	//	const loopButton = new ButtonBuilder().setCustomId("music-loop").setEmoji("<:loop:1127601962444128336>").setStyle("Secondary");
	const queueButton = new ButtonBuilder().setCustomId("music-queue").setEmoji(client.playlist).setStyle("Secondary");

	const musicButtonRow = new ActionRowBuilder().addComponents(backButton, playPauseButton, skipButton, /*loopButton*/ queueButton);

	const embed = new EmbedBuilder()
		.setTitle("Playing Now")
		.setDescription(`**${track.toHyperlink()}** by **${track.author}**\n-# ${track.duration}`)
		.setThumbnail(`${track.thumbnail}`)
		//	.setColor("Random")
		.setFooter({ text: `Added by ${track.requestedBy.displayName}`, iconURL: `${track.requestedBy.displayAvatarURL()}` })
		.setColor(`${queue.metadata.interaction.member.displayHexColor}`);
	queue.metadata.interaction.channel.send({ embeds: [embed], components: [musicButtonRow] });
});
require("./error");
//* Filters
require("./filters");
//* Import handlers
require("./handler/slashHandler")(client);
require("./handler/eventHandler")(client);
require("./handler/buttonHandler")(client);
