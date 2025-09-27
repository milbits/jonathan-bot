const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require("util").promisify(setTimeout);

module.exports = {
	name: "mindreader",
	category: "Fun",
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName("mindreader")
		.setDescription("reads your mind with 100% accuracy!")
		.addIntegerOption((option) => option.setName("number").setDescription("think of a realllly cool number (a cool one)").setRequired(true)),
	async execute(client, interaction) {
		await interaction.reply("Analysing brainwaves...");
		await wait(2000);
		await interaction.editReply("Inspecting brainwave patterns...");
		await wait(4000);
		await interaction.editReply("Doing an EEG...");
		await wait(4000);
		await interaction.editReply("Using magic like a badass wizard");
		await wait(2000);
		await interaction.editReply(`Hiring the CIA to initiate mind control...`);
		await wait(500);
		interaction.editReply(`you're thinking of ${interaction.options.getInteger("number")}`);
	},
};
