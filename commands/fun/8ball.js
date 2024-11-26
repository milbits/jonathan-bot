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
		const question = interaction.options.getString("question");
		var list = [
			"yes",
			"yeah",
			"no",
			"lmao",
			":3",
			"idc",
			"bro idk",
			"no fuck you",
			"kys",
			"sure",
			"nah",
			"what 💀",
			`This is not funny. It's just not fucking funny dude. What made you think this is a good thing to ask? Because it's not. "${question}" is extremely offensive to me. Good job, you give me a panic attack and now I'm hyperventilating. I hope you're happy. Rethink your entire fucking life, I mean it. Go fuck yourself.`,
			"spit on that thang",
			"mango mango mango mangfo mango mango mango",
			`those who ${question}: :skull: :skull: :skull:`,
			"???? super paper mario and splatoon is what every sane person wants but nah, you get 3 songs and a trillion fanfares from a game people used to mod wiius",
			"sorry, i cant answer right now. i just got cucked on discord. give me some time.",
			`hold on kitten, ${interaction.user} asked me something... *moves my 500kg belly to you and drops all that fat on your desk* so to answer your question, yes, now leave me alone, im in the middle of having e-sex with my kitten. one more disturbance and im banning you.`,
			"get this idiot outta my face",
			"idk but sometimes i breathe, is that normal? chat? is that normal? ",
			`AITA for not replying to ${interaction.user}'s question?`,
			`People of reddit, ${question}?`,
			"💀💀💀💀💀💀💀💀💀💀💀💀",
			"I was in some random house that was supposed to be my new house and randomly a street dog spawned in and it has causing havoc and trying to kill me and then a sheep spawned in and I had to lock it in a room then another farm animal I don't remember spawned in and I locked it in another room then I beat the dog to death with my bare hands and let the farm animals go back to their home then immediately after my family decided to go on vacation in Israel and it was so spontaneous we didn't even have packed bags and Israel was only like 10 minutes away for some reason but it felt like 10 hours and it suddenly turned into spending the rest of our life in Israel instead of just a vacation and we all had to learn Hebrew and get jobs to support ourselves then I slept in the dream and woke up and no one was there and I called them and asked my family where they were and they told me \"we're with 6.9 billion people watching the snickers rocket launch in GTA 5\" then I woke up",
			"heh, thats quite a funny post! OP, take this upvote gold reward and big chungus! and remember, sub2pewds! brofist (unpopular opinion: Don't react to this message, emojis are cringe.)",
			'Before I can answer this question, we need to understand what Discord is and it\'s history. Discord is an instant messaging and VoIP social platform which allows communication through voice calls, video calls, text messaging, and media. Communication can be private or take place in virtual communities called "servers".\nThe concept of Discord came from Jason Citron, who had founded OpenFeint, a social gaming platform for mobile games,[13] and Stanislav Vishnevskiy, who had founded Guildwork, another social gaming platform. Citron sold OpenFeint to GREE in 2011 for US$104 million,[14] which he used to found Hammer & Chisel, a game development studio, in 2012.[15] Their first product was Fates Forever, released in 2014, which Citron anticipated to be the first multiplayer online battle arena (MOBA) game on mobile platforms, but it did not become commercially successful',
		];
		var randomThing = Math.floor(Math.random() * list.length);
		var embed = new EmbedBuilder().setDescription(`\`${question}\` \n\n I'm (not) thinking...`).setColor("Random");
		await interaction.reply({
			embeds: [embed],
		});
		await wait(1000);
		embed.setDescription(`\`${question}\` \n \n **${list[randomThing]}**`);
		await interaction.editReply({
			embeds: [embed],
		});
	},
};
