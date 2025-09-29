const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const wait = require("util").promisify(setTimeout);

module.exports = {
	name: "hack",
	category: "Fun",
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName("hack")
		.setDescription("hack someone")
		.addStringOption((option) => option.setName("target").setDescription("The target user").setRequired(true)),
	async execute(client, interaction) {
		const target = interaction.options.getString("target");

		await interaction.reply("Preparing...");
		await wait(3000);
		await interaction.editReply(`Injecting spyware into ${target}'s device...`);
		await wait(1000);
		await interaction.editReply("Scrapping private information...");
		await wait(1000);
		await interaction.editReply("Decrypting data...");
		await wait(2000);
		await interaction.editReply(`Sending Data to ${interaction.guild.name}...`);
		await wait(1000);
		var nam = ["Adolf", "Adolfus", "Miles", // meeeeee :3
			"Robert",
			"Michael",
			"Chris",
			"Max",
			"Ben",
			"Carl",
			"James",
			"John",
			"Susan",
			"Mary",
			"Elizabeth",
			"David",
			"Kevin",
			"Gary",
			"Sandra",
			"Nancy",
			"Tim",
			"Joe",
			"Barack",
			"Obama",
			"Trump",
			"Musk",
			"Donald",
			"Luke",
			"Pepe",
			"Mario",
			"Luigi",
			"Toad",
			"Addison",
			"Clint",
			"Joris",
			"Samuel",
			"Anon",
			"Link",
			"Mr.",
			"Kanye",
			"Albert",
			"Skibidi",
			"Diddy",
			"Mustard",
			"Epstein",
			"Jeffrey",
			"Sebastian",
			"Agent",
			`${target}`,
			"Jonathan"
		];
		var name = Math.floor(Math.random() * nam.length);
		var sur = [
			"Hitler",
			"Hitlerus",
			"Morales",
			"Pratt",
			"Franz",
			"Elon",
			"Trump",
			"Obama",
			"Yoda",
			"Simpsons",
			"Stark",
			"Edwards",
			"Novikov",
			"Cena",
			"Mario",
			"Toadstool",
			"Morbius",
			"Breast",
			"West",
			"Einstein",
			"Honker",
			"Wonka",
			"Jeffrey",
			"Blud",
			"Wokeler",
			"Solace",
			"Urbanshade",
		];
		var sure = Math.floor(Math.random() * sur.length);
		var ip = Math.floor(Math.random() * 255);
		var ip2 = Math.floor(Math.random() * 254);
		var ip3 = Math.floor(Math.random() * 253);
		var ip4 = Math.floor(Math.random() * 252);
		var number = Math.floor(Math.random() * 99999999999);
		var num = Math.floor(Math.random() * 420);
		var pass = [
			"fortnite69",
			"P0RNiSc00lXOXOXOXOXO",
			`${interaction.options.getString("target")}`,
			"Password123",
			"I love m0m",
			"iloveniggers1274",
			"sl4vesh0uldbefre3_",
			`I :heart: ${interaction.member.user.tag}`,
			"qwertz",
			"qwerty",
			"1234567890",
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
			"Mr. Breast125",
			"AhjKlHPjsnJNsj864839290",
			"AbCdEfG1234567",
			"AmoGuS69420s3x",
			"gayp0rnhub6969696969696969696969696969696969",
			"Jh987-02ked-07Rew-opR7a",
			"6 characters or more",
			"penisgohard",
		];
		var word = Math.floor(Math.random() * pass.length);
		const e = [
			"hi:333@gmail.com",
			`${interaction.options.getString("target")}@gmail.com`,
			`official${interaction.options.getString("target")}@gmail.com`,
			`${interaction.member.user.tag}@gmail.com`,
			`${nam[name]}@gmail.com`,
			`${nam[name]}${sur[sure]}@gmail.com`,
			"imcooluwu@yahoo.ma",
			"mamaaaaaaaaaaaamaaaaaaaaaaaaaaaaaaaa@mama.mam",
			`${interaction.options.getString("target")}@gmail.com`,
		];
		const mail = Math.floor(Math.random() * e.length);

		interaction.editReply({
			content: "‎",
			embeds: [
				new EmbedBuilder()
					.setTitle(`${interaction.options.getString("target")} was hacked!`)
					.setColor("Random")
					.addFields(
						{
							name: "IP-Address",
							value: `${ip}.${ip2}.${ip3}.${ip4}`,
							inline: true,
						},
						{
							name: "Telephone Number",
							value: `+${num} ${number}`,
							inline: true,
						},
						{
							name: "Full Name",
							value: `${nam[name]} ${sur[sure]}`,
							inline: true,
						},
						{
							name: "Password",
							value: `${pass[word]}`,
							inline: true,
						},
						{
							name: "Address",
							value: `${addr[ess]} Street`,
							inline: true,
						},
						{
							name: "E-Mail",
							value: `${e[mail]}`,
							inline: true,
						},
						{
							name: "WOKEness", // this is a joke; im gay
							value: `${w[oke]}`,
							inline: true,
						}
					),
			],
		});
	},
};
