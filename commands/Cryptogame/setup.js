const { MessageEmbed } = require('discord.js');
let items = require("../../cryptogame_files/itemlist.json");
let users_db = require("../../cryptogame_files/users_db.json");

module.exports = {
    name: "setup",
    ownerOnly: false,
    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.member;

        if(!items) return message.reply("Error, contact with Server Moderator.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!users_db[user.id]) return message.reply("Error, contact with Server Moderator.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        const uCPU = items.CPU[users_db[user.id].CPU].NAME;
        const uGPU = items.GPU[users_db[user.id].GPU].NAME;
        const uRAM = items.RAM[users_db[user.id].RAM].NAME;
        const uPOWER = items.POWER[users_db[user.id].POWER].NAME;
        const uMOTHER = items.MOTHERBOARD[users_db[user.id].MOTHERBOARD].NAME;

        const embed = new MessageEmbed().setColor("#FFFFFF").setTitle(`${user.user.tag} setup`).addField(`CPU:`, `${uCPU}`, false).addField(`GPU:`, `${uGPU}`, false).addField(`GPU Amount:`, `${users_db[user.id].GPU_A}`, false).addField(`RAM:`, `${uRAM}`, false).addField(`POWER SUPPLY:`, `${uPOWER}`, false).addField(`MOTHERBOARD:`, `${uMOTHER}`,false).addField(`MINERS:`, `${users_db[user.id].MINERS}`, false);

        message.channel.send({embeds: [embed]});
    }
}