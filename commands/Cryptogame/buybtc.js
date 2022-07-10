const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "buybtc",
    ownerOnly: false,
    run: async (client, message, args) => {

        const amount = args[0];

        if(!args[0]) return message.reply("You need to add specific amount of USD.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!amount || isNaN(amount) || amount < 0 || amount > 100000000) return message.reply("You need to enter specific amount of USD (ONLY NUMBERS BETWEEN 1 AND 99999999.99).").then(repliedMessage => {
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

        var btcprice, btcs, usds, usdtobtc, addbtc, rmusd;
        var sql = `SELECT * FROM USERS WHERE userID=${message.author.id}`;
        var sql2 = `SELECT * FROM BITCOIN WHERE ID=1`;

        connection.query(sql, function (err, result) {
            if (err) throw err;

            btcs = result[0].uBitcoin;
            usds = result[0].uUSD;

            if (usds < amount) return message.reply("You entered more USD than you have.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));

            connection.query(sql2, function (err, res) {
                if (err) throw err;

                btcprice = res[0].CPRICE;
                usdtobtc = parseFloat(amount * 1) / parseFloat(btcprice);
                addbtc = parseFloat(btcs) + parseFloat(usdtobtc);

                if (addbtc > 999.99999999) addbtc = 999.99999999;

                rmusd = parseFloat(usds) - parseFloat(amount);

                var sqlup = `UPDATE USERS SET uBitcoin=${addbtc}, uUSD=${rmusd} WHERE userID=${message.author.id}`;

                connection.query(sqlup, function (err, res) {
                    if (err) throw err;
                });

                const embed = new MessageEmbed().setColor("#FFFFFF").setDescription(`You bought \`${parseFloat(usdtobtc).toFixed(8)} BTC\` for \`${parseFloat(amount).toFixed(2)} USD\``).addField(`BTC Price when buying:`, `\`\`\`yaml\n1 BTC = ${parseFloat(btcprice).toFixed(2)}\`\`\``)
    
                message.channel.send({embeds: [embed]});
                connection.end();
            });
        });
    }
}