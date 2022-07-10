module.exports = {
    name: "transferusd",
    ownerOnly: false,
    run: async (client, message, args) => {

        var userusds, authorusds, usdsadd, chkusd, tormusd;

        const user = message.mentions.members.first();
        const amount = args[1];

        if(!args[0]) return message.reply("You need to mention user first.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));
        if(!args[1]) return message.reply("You need to add specific amount to transfer.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(user.id == client.user.id) return message.reply("You can't transfer USD to BOT.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!user) return message.reply("I can't find this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!amount || isNaN(amount) || amount < 0 || amount > 100000000) return message.reply("You must enter the value to transfer (ONLY NUMBERS BETWEEN 1 AND 99999999.99).").then(repliedMessage => {
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

            authorusds = result[0].uUSD;

            if(authorusds == 0) return message.reply("You have 0.00 USD.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
            if(authorusds < amount) return message.reply("You want to transfer more USD than you have.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));

            connection.query(sql2, function (err, res) {
                if(err) throw err;

                userusds = res[0].uUSD;

                if(userusds == 99999999.99) return message.reply("You can't transfer USD to this user because he has max amount of USD.").then(repliedMessage => {
                    setTimeout(() => repliedMessage.delete(), 5000);
                }).catch(err => console.error(err));

                chkusd = parseFloat(userusds) + parseFloat(authorusds);
                tormusd = parseFloat(authorusds) - parseFloat(amount);
                
                if(chkusd > 100000000) 
                {
                    usdsadd = 99999999.99;
                }
                else {
                    usdsadd = chkusd;
                }

                var sqladd = `UPDATE USERS SET uBitcoin=${usdsadd} WHERE userID=${user.id}`;
                var sqlrm = `UPDATE USERS SET uBitcoin=${tormusd} WHERE userID=${message.author.id}`

                connection.query(sqladd, function (err, result) {
                    if (err) throw err;
                });
                connection.query(sqlrm, function (err, result) {
                    if (err) throw err;
                });

                message.reply(`Transfered **${amount} USD** to **${user}**`)
            });

            connection.end();
        });
    }
}