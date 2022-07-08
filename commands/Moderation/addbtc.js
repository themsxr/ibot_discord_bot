const { readdirSync } = require("fs");

module.exports = {
    name: "addbtc",
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

        if(user.id == client.user.id) return message.reply("You can't add Bitcoins to BOT.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!user) return message.reply("I can't find this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!amount || isNaN(amount) || amount < 0 || amount > 999) return message.reply("You must enter the value to add (ONLY NUMBERS GREATER THAN 0).").then(repliedMessage => {
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

        connection.query(sql, function (err, result) {
            if (err) throw err;
            if (result > 0) return message.reply("Can't find this user in database.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
            
            var btc, addbtc;

            btc = result[0].uBitcoin;
            addbtc = parseFloat(btc) + parseFloat(amount);

            if(addbtc > 1000) addbtc = 999.99999999;

            var sqladd = `UPDATE USERS SET uBitcoin=${addbtc} WHERE userID=${user.id}`;
                connection.query(sqladd, function (err, result) {
                    if (err) throw err;
                });

            connection.end();
        });
        
    },
};
