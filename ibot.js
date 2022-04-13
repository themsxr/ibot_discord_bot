const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log(process.env.DISCORD_TOKEN);
	console.log('Ready!');
});

client.login(token);