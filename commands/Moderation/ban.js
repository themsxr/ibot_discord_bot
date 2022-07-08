const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "ban",
    ownerOnly: false,
    run: async (client, message, args) => {

        if(!args[0]) return message.reply("You need to mention user to ban first.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!args[1]) return message.reply("You need to add reason of ban.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');

        if(!user || user.id == client.user.id) return message.reply("I can't find or ban this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!user.kickable) return message.reply("I can't ban this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.reply("You don't have permissions.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
        }
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            return message.reply("Sorry, I've no permissions to ban users.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
        }

        const embed = new MessageEmbed().setColor("#FFFFFF").setTitle(`${user.user.tag} has been banned`).addField('Banned by:', `\`${message.author.tag}\``, true).addField('Reason:', `\`${reason}\``, true);

        const guild = client.guilds.cache.get('853046031843065856');
        let bchannel = guild.channels.cache.get('987140467542073394');
        bchannel.send({embeds: [embed]});

        await user.ban(reason);
    }
}