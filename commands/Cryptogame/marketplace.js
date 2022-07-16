const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: "marketplace",
    ownerOnly: false,
    run: async (client, message, args) => {

        const arrowright = ":arrow_right:"

        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel("MARKETPLACE")
          .setURL("https://www.eyethecreator.com/discord/marketplace")
          .setStyle("LINK")
        );

        const embed = new MessageEmbed().setColor("#FFFFFF").addField("How to buy from marketplace?", "`Use: !buyitem [ITEM ID]`");
    
        message.channel.send({embeds: [embed], components: [row]});
    }
}