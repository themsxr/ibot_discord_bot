const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "transferbtc",
    ownerOnly: false,
    run: async (client, message, args) => {

        var userbtcs, authorbtcs, btcadd, chkbtc, tormbtc;

        const user = message.mentions.members.first();
        const amount = args[1];

        if(!args[0]) return message.reply("You need to mention user first.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!args[1]) return message.reply("You need to add specific amount to transfer.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(user.id == client.user.id) return message.reply("You can't transfer BTC to BOT.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        
        if(user.id == message.author.id) return message.reply("You can't transfer BTC to yourself.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!user) return message.reply("I can't find this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!amount || isNaN(amount) || amount < 0.00000001 || amount > 999.99999999) return message.reply("You must enter the value to transfer (ONLY NUMBERS BETWEEN 0.00000001 AND 999.99999999).").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        var mysql = require('mysql');
        var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'eddy',
        password : 'TheYellowDik1!',
        database : 'discord'
        });
        connection.connect();

        var sql1 = `SELECT * FROM USERS WHERE userID=${message.author.id}`;
        var sql2 = `SELECT * FROM USERS WHERE userID=${user.id}`;

        connection.query(sql1, function (err, result) {
            if(err) throw err;

            authorbtcs = result[0].uBitcoin;

            if(authorbtcs == 0) return message.reply("You have 0.00000000 BTC.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
            if(authorbtcs < amount) return message.reply("You want to transfer more BTC than you have.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));

            connection.query(sql2, function (err, res) {
                if(err) throw err;

                userbtcs = res[0].uBitcoin;

                if(userbtcs == 999.99999999) return message.reply("You can't transfer BTC to this user because he has max amount of BTC.").then(repliedMessage => {
                    setTimeout(() => repliedMessage.delete(), 5000);
                }).catch(err => console.error(err));

                chkbtc = parseFloat(userbtcs) + parseFloat(amount);
                tormbtc = parseFloat(authorbtcs) - parseFloat(amount);
                
                if(chkbtc > 999.99999999) 
                {
                    btcadd = 999.99999999;
                }
                else {
                    btcadd = chkbtc;
                }

                var sqladd = `UPDATE USERS SET uBitcoin=${btcadd} WHERE userID=${user.id}`;
                var sqlrm = `UPDATE USERS SET uBitcoin=${tormbtc} WHERE userID=${message.author.id}`

                connection.query(sqladd, function (err, result) {
                    if (err) throw err;
                });
                connection.query(sqlrm, function (err, result) {
                    if (err) throw err;
                });

                const embed = new MessageEmbed().setDescription(`**[\nTransfered \`\`\`yaml\n${parseFloat(amount).toFixed(8)} BTC\`\`\` to ${user.user.tag}](https://discordapp.com/users/${user.id}/)**`).setColor("#FFFFFF");
    
                message.channel.send({embeds: [embed]});
                connection.end();
            });
        });
    }
}