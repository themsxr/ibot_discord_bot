const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "marketplace",
    ownerOnly: false,
    run: async (client, message, args) => {

        const arrowright = ":arrow_right:"

        const embed = new MessageEmbed().setColor("#FFFFFF").setDescription(`**VISIT ${arrowright} [MARKETPLACE](https://www.eyethecreator.com/discord/marketplace)**`).addField("How to buy from marketplace?", "`Use: !buy [ITEM ID]`");
    
        message.channel.send({embeds: [embed]});
    }
}