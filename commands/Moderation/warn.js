const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: "warn",
    ownerOnly: false,
    run: async (client, message, args) => {

        if(!args[0]) return message.reply("You need to mention user to warn first.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!args[1]) return message.reply("You need to add reason of warn.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');

        if(!user || user.id == client.user.id) return message.reply("I can't find or warn this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.reply("You don't have permissions.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
        }

        var mysql = require('mysql');
        var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'eddy',
        password : 'TheYellowDik1!',
        database : 'discord'
        });
        connection.connect();
        
        var sql = `SELECT * FROM USERS WHERE userID=${user.id}`;
        var warns;

        const guild = client.guilds.cache.get('853046031843065856');

        connection.query(sql, async function (err, result) {
            if (err) throw err;

            warns = parseInt(result[0].uWarns) + 1;

            if (warns == 1)
            {
                var sqlup = `UPDATE USERS SET uWarns=1 WHERE userID=${user.id}`;
                connection.query(sqlup, function (err, result) {
                    if (err) throw err;
                });

                const wembed = new MessageEmbed().setColor("#FFFFFF").setTitle(`${user.user.tag} has been warned`).addField(`Warned by:`, `${message.author.tag}`, true).addField(`Reason:`, `${reason}`, true);

                let wchannel = guild.channels.cache.get('947043636871327794');
                wchannel.send({embeds: [wembed]});
            }
            else {
                if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                    return message.reply("Sorry, I've no permissions to ban users.").then(repliedMessage => {
                        setTimeout(() => repliedMessage.delete(), 5000);
                    }).catch(err => console.error(err));
                }

                reason = "Max number of warns.";
                const bembed = new MessageEmbed().setColor("#FFFFFF").setTitle(`${user.user.tag} has been banned`).addField(`Banned by:`, `iBot`, true).addField(`Reason:`, `${reason}`, true);

                let bchannel = guild.channels.cache.get('987140467542073394');

                bchannel.send({embeds: [bembed]});
                await user.ban({reason: reason});
            }
        });
    }
}