const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const wait = require("util").promisify(setTimeout);

module.exports = {
	name: "hack",
	category: "Fun",
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName("doxx")
		.setDescription("doxx someone")
		.addStringOption((option) => option.setName("victim").setDescription("the poor innocent soul").setRequired(true)),
	async execute(client, interaction) {
		const target = interaction.options.getString("victim");

		await interaction.reply("Preparing...");
		await wait(3000);
		await interaction.editReply(`Injecting spyware into ${target}'s device...`);
		await wait(1000);
		await interaction.editReply("Scraping private information...");
		await wait(1000);
		await interaction.editReply("Decrypting data...");
		await wait(2000);
		await interaction.editReply(`Sending Data to ${interaction.guild.name}...`);
		await wait(1000);
		// function to randomly select one string from an array
		function randomizer(array){
			const i = Math.floor(Math.random() * array.length);
			return array[i]
		}
		var nameList = [
			"Adolf",
			"Adolfus",
			"Miles",
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
			"Jonathan",
			"Shigeru",
			"Jin",
		];
		var name = randomizer(nameList)
		var lastNameList = [
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
			"Joker",
			"Miyamoto",
			"Sakai",
		];
		var lastName = randomizer(lastNameList)
		var ip = Math.floor(Math.random() * 255);
		var ip2 = Math.floor(Math.random() * 254);
		var ip3 = Math.floor(Math.random() * 253);
		var ip4 = Math.floor(Math.random() * 252);
		var number = Math.floor(Math.random() * 999999999);
		var country = Math.floor(Math.random() * 420);
		var woke = Math.floor(Math.random() * 100);
		var passwordList = [
			"fortnite69",
			"P0RNiSc00lXOXOXOXOXO",
			`${interaction.options.getString("target")}`,
			"Password123",
			"I love m0m",
			"iloveblackmen1274",
			"sk1b1dy",
			"mommysbestboy",
			`${interaction.member.user.tag}sgoodboy6969`,
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
		var password = randomizer(passwordList);
		const user = [
			"hi:333",
			`official${target}`,
			`${interaction.member.user.tag}`,
			`${name}`,
			`${name} ${lastName}`,
			"imcooluwu",
			"mamaaaaaaaaaaaamaaaaaaaaaaaaaaaaaaaa",
			`${interaction.options.getString("target")}`,
			"proudfag",
			`${target}`,
			"ShigeruMiyamoto"
		];
		const domain = [
			"@gmail.com",
			"@protonmail.com",
			"@proton.me",
			"@icloud.com",
			"@yahoo.ma",
			"@lgbt.lol",
			"@urbanshade.dk",
			"@nintendo.co.jp"
		]
		const emailUser = randomizer(user);
		const emailDomain = randomizer(domain);

		interaction.editReply({
			content: "‎",
			embeds: [
				new EmbedBuilder()
					.setTitle(`${interaction.options.getString("target")} got doxxed!`)
					.setColor("Random")
					.addFields(
						{
							name: "IP-Address",
							value: `${ip}.${ip2}.${ip3}.${ip4}`,
							inline: true,
						},
						{
							name: "Phone Number",
							value: `+${country} ${number}`,
							inline: true,
						},
						{
							name: "Full Name",
							value: `${name} ${lastName}`,
							inline: true,
						},
						{
							name: "Password",
							value: `${password}`,
							inline: true,
						},
						/*{
							name: "Address",
							value: `${addr[ess]} Street`,
							inline: true,
						},*/
						{
							name: "E-Mail",
							value: `${emailUser}${emailDomain}`,
							inline: true,
						},
						{
							name: "WOKEness", // this is a joke; im gay
							value: `${woke}%`,
							inline: true,
						}
					),
			],
		});
	},
};
