const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Displays user info'),
	async execute(interaction) {
		const uEmbed = new MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('User info')
            .addField(`${interaction.member.username}`)
        interaction.reply({ embeds: [uEmbed] });
	},
};