const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
const cooldowns = new Map();
const Discord = require("discord.js");
const { StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");
const { useHistory } = require("discord-player");
const wait = require("util").promisify(setTimeout);
const { useQueue, QueueRepeatMode } = require("discord-player");

module.exports = async (client, interaction) => {

	// Autocomplete
	if (interaction.isAutocomplete()) {
		let command = interaction.client.commands.get(interaction.commandName);

		try {
			await command.autocomplete(client, interaction);
		} catch (error) {
			console.warn(`${error}`);
		}
		// Slash commands
	} else if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);

		if (!command) return;
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
		// Check permissions

		if (!interaction.member.permissions.has(command.perms || [])) {
			return await interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Missing Permissions",
						description: `you need the \`${command.perms}\` permission to use this command`,
						color: "#f04747",
					},
				],
			});
		}
		if (!interaction.guild.members.me.permissions.has(command.botPerms || [])) {
			return await interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Error",
						description: `i need the \`${command.botPerms}\` permission to execute this command`,
						color: "#f04747",
					},
				],
			});
		}

		// Cooldown
		var now = Date.now();
		let timeStamp = cooldowns.get(command.name) || new Collection();
		let cool = command.cooldown || 5;
		let userCool = timeStamp.get(interaction.user.id) || 0;
		let estimated = userCool + cool * 1000 - now;

		if (userCool && estimated > 0) {
			const expirationTime = timeStamp.get(interaction.user.id) + cool * 1000;

			const embed = new Discord.EmbedBuilder()
				.setDescription(`You can use **/${command.name}** again **<t:${Math.round(expirationTime / 1000)}:R>**`)
				.setTitle("Cooldown")
				.setColor("Random");
			return await interaction.reply({ embeds: [embed], ephemeral: true });
		}

		timeStamp.set(interaction.user.id, now);
		cooldowns.set(command.name, timeStamp);
		try {
			await command.execute(client, interaction);
		} catch (error) {
			console.error(error);
			interaction
				.reply({
					ephemeral: true,
					embeds: [
						{
							title: "Error",
							color: 0xf04747,
							description: `\`\`\`js\n${error}\`\`\``,
						},
					],
				})
				.catch(
					interaction.followUp({
						ephemeral: true,
						embeds: [
							{
								title: "Error",
								color: 0xf04747,
								description: `\`\`\`js\n${error}\`\`\``,
							},
						],
					})
				);
		}
	}

	if (interaction.isButton()) {
		const buttonInteraction = client.buttonCommands.get(interaction.customId);
		if (!buttonInteraction) return;
		await buttonInteraction.execute(client, interaction);
	}
};
