const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "sellbtc",
    ownerOnly: false,
    run: async (client, message, args) => {

        const amount = args[0];

        if(!args[0]) return message.reply("You need to add specific amount of BTC.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!amount || isNaN(amount) || amount < 0.00000001 || amount > 999.99999999) return message.reply("You need to enter specific amount of BTC (ONLY NUMBERS BETWEEN 0.00000001 AND 99999999.99).").then(repliedMessage => {
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

        var btcprice, btcs, usds, btctousd, addusd, rmbtc;
        var sql = `SELECT * FROM USERS WHERE userID=${message.author.id}`;
        var sql2 = `SELECT * FROM BITCOIN WHERE ID=1`;

        connection.query(sql, function (err, result) {
            if (err) throw err;

            btcs = result[0].uBitcoin;
            usds = result[0].uUSD;

            if (btcs < amount) return message.reply("You entered more BTC than you have.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));

            connection.query(sql2, function (err, res) {
                if (err) throw err;

                btcprice = res[0].CPRICE;
                btctousd = (parseFloat(amount) * parseFloat(btcprice)) / 1;
                addusd = parseFloat(usds) + parseFloat(btctousd);

                if (addusd > 99999999.99) addusd = 99999999.99;

                rmbtc = parseFloat(btcs) - parseFloat(amount);

                var sqlup = `UPDATE USERS SET uBitcoin=${rmbtc}, uUSD=${addusd} WHERE userID=${message.author.id}`;

                connection.query(sqlup, function (err, res) {
                    if (err) throw err;
                });

                const embed = new MessageEmbed().setColor("#FFFFFF").setDescription(`You've sold \`${parseFloat(amount).toFixed(8)} BTC\` for \`${parseFloat(btctousd).toFixed(2)} USD\``).addField(`BTC Price when selling:`, `\`\`\`yaml\n1 BTC = ${parseFloat(btcprice).toFixed(2)} USD\`\`\``)
    
                message.channel.send({embeds: [embed]});
                connection.end();
            });
        });
    }
}