const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const cooldown = new Set();

module.exports = {
    name: "buyitem",
    ownerOnly: false,
    run: async (client, message, args) => {

        
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('button1')
          .setLabel("YES")
          .setStyle("DANGER"),
          new MessageButton()
          .setCustomId('button2')
          .setLabel("NO")
          .setStyle("SUCCESS")
        );
          
        let embed = new MessageEmbed()
        .setTitle("If you buy this item you'll replace your current item!")
        .setDescription("Are you sure you want to do this?")
        
          message.channel.send({
            embeds: [embed],
            components: [row]
          })
    }
}