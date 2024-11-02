module.exports = {
	name: "music-queue",
	async execute(client, interaction) {
		await client.commands.get("queue").execute(client, interaction);
	},
};
