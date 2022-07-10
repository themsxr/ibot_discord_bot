const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "wallet",
    ownerOnly: false,
    run: async (client, message, args) => {

        var btcs, usds;

        const user = message.mentions.members.first() || message.member;
        if(!user || user.id == client.user.id) return message.reply("I can't show you wallet of this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'eddy',
            password : 'TheYellowDik1!',
            database : 'discord'
            });
        var sql = `SELECT * FROM USERS WHERE userID=${user.id}`;

        connection.connect();
        connection.query(sql, function (err, result) {
            if(err) throw err;

            btcs = result[0].uBitcoin;
            usds = result[0].uUSD;

            const embed = new MessageEmbed().setDescription(`**[${user.user.tag} wallet](https://discordapp.com/users/${user.id}/)**`).setColor("#FFFFFF").addField("BTC:", `\`\`\`yaml\n${parseFloat(btcs).toFixed(8)}\`\`\``, true).addField("USD:", `\`\`\`yaml\n${parseFloat(usds).toFixed(2)}\`\`\``, true);
    
            message.channel.send({embeds: [embed]});

            connection.end();
        });
    }
}