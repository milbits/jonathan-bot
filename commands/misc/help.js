const { SlashCommandBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	name: "help",
	category: "Misc",
	cooldown: 10,
	data: new SlashCommandBuilder().setName("help").setDescription("woah"),
	execute(client, interaction) {
		const collector = interaction.channel.createMessageComponentCollector({ idle: 10000 });

		const funBtn = new ButtonBuilder().setLabel("Fun").setStyle("Secondary").setCustomId("Fun").setEmoji("🧌");
		const modBtn = new ButtonBuilder().setLabel("Moderation").setStyle("Secondary").setCustomId("Mod").setEmoji("🛡").setDisabled(false);
		const miscBtn = new ButtonBuilder().setLabel("Misc").setStyle("Secondary").setCustomId("Misc").setEmoji("❓");
		const musicBtn = new ButtonBuilder().setLabel("Music").setStyle("Secondary").setCustomId("Music").setEmoji("🎵");
		const lvlBtn = new ButtonBuilder().setLabel("Coming Soon...").setStyle("Secondary").setCustomId("credit").setDisabled(true);

		const btns1 = new ActionRowBuilder().addComponents([funBtn, modBtn, miscBtn, musicBtn, lvlBtn]);
		collector.on("collect", async (i) => {
			if (i.user.id === interaction.user.id) {
				i.update({
					embeds: [
						new EmbedBuilder()
							.setColor("Random")
							.setTitle("Help")
							.addFields({
								name: i.customId,
								value: `${interaction.client.commands
									.filter((x) => x.category == i.customId)
									.map((x) => "`" + x.name + "`")
									.join(", ")}`,
							}),
					],
				});
			} else {
			}
		});

		interaction.reply({
			components: [btns1],
			embeds: [new EmbedBuilder().setColor("Random").setTitle("Choose a Category")],
		});
	},
};
