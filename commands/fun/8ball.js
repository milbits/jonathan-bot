const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const wait = require("util").promisify(setTimeout);

module.exports = {
	name: "8ball",
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("very cool 8ball")
		.addStringOption((option) => option.setName("question").setDescription("the question!!!").setRequired(true)),
	async execute(client, interaction) {
		var pp = [
			"yes",
			"yeah",
			"no",
			"lmao",
			":3",
			"kill yourself",
			"u decide",
			"im too lazy to answer rn",
			"idc",
			"bro idk",
			"no fuck you",
			"kys",
			"nigger",
			"sure",
			"lmao no",
			"nah",
			"what 💀",
		];
		var ppp = Math.floor(Math.random() * pp.length);
		var embed = new EmbedBuilder()
			.setTitle("8Ball")
			.setDescription(`\`${interaction.options.getString("question")}\` \n\n Im thinking...`)
			.setColor("Random");
		await interaction.reply({
			embeds: [embed],
		});
		await wait(1000);
		embed.setDescription(`\`${interaction.options.getString("question")}\` \n \n **${pp[ppp]}**`);
		await interaction.editReply({
			embeds: [embed],
		});
	},
};
