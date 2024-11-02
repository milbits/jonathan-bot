const fs = require("fs");
const buttons = fs.readdirSync("./buttons").filter((file) => file.endsWith(".js"));

module.exports = function (client) {
	for (const file of buttons) {
		const button = require(`../buttons/${file}`);
		console.log(`✅ | ${file} `);
		client.buttonCommands.set(button.name, button);
	}
};
