const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    ownerOnly: false,
    run: async (client, message, args) => {

        const arrowright = ":arrow_right:"

        const embed = new MessageEmbed().setColor("#FFFFFF").setDescription(`**VISIT ${arrowright} [COMMANDS](https://www.eyethecreator.com/discord/commands)**`);
    
        message.channel.send({embeds: [embed]});
    },
};
