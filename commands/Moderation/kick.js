const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "kick",
    ownerOnly: false,
    run: async (client, message, args) => {

        if(!args[0]) return message.reply("You need to mention user to kick first.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!args[1]) return message.reply("You need to add reason of kick.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');

        if(!user || user.id == client.user.id) return message.reply("I can't find or kick this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!user.kickable) return message.reply("I can't kick this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            return message.reply("You don't have permissions.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
        }
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
            return message.reply("Sorry, I've no permissions to kick users.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
        }

        const embed = new MessageEmbed().setColor("#FFFFFF").setTitle(`${user.user.tag} has been kicked`).addField('Kicked by:', `\`${message.author.tag}\``, true).addField('Reason:', `\`${reason}\``, true);

        const guild = client.guilds.cache.get('853046031843065856');
        let kchannel = guild.channels.cache.get('987140450353823804');
        kchannel.send({embeds: [embed]});

        await user.kick(reason);
    }
}