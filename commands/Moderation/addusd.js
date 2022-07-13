const { readdirSync } = require("fs");

module.exports = {
    name: "addusd",
    ownerOnly: false,
    run: async (client, message, args) => {

        const user = message.mentions.members.first();
        const amount = args[1];

        if(!args[0]) return message.reply("You need to mention user first.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!args[1]) return message.reply("You need to add specific amount to add.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(user.id == client.user.id) return message.reply("You can't add USD to BOT.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!user) return message.reply("I can't find this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!amount || isNaN(amount) || amount == 0 || amount < 0 || amount > 100000000) return message.reply("You must enter the value to add (ONLY NUMBERS BETWEEN 0 AND 100000000).").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if (!message.member.permissions.has("KICK_MEMBERS")) {
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

        connection.query(sql, function (err, result) {
            if (err) throw err;
            if (result > 0) return message.reply("Can't find this user in database.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
            
            var usd, addusd;

            usd = result[0].uUSD;
            addusd = parseFloat(usd) + parseFloat(amount);

            if(addusd > 100000000) addusd = 99999999.99;

            var sqladd = `UPDATE USERS SET uUSD=${addusd} WHERE userID=${user.id}`;
            connection.query(sqladd, function (err, result) {
                if (err) throw err;
            });

            message.reply(`Added **${amount} USD** to ${user}`).then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));

            connection.end();
        });
        
    },
};
