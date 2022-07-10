const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const handler = require("./handler/index");
const { token } = require("./config.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});

const Discord = require('discord.js');
module.exports = client;
client.discord = Discord;
client.commands = new Collection();
client.slash = new Collection();
client.config = require('./config')
handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
});


client.on("ready", (client) => {
    setInterval(() => {
        setTimeout(function () {
            require('child_process').fork('./btc.js');
        }, 299000);

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'eddy',
            password : 'TheYellowDik1!',
            database : 'discord'
        });
        connection.connect();

        var sql = `SELECT * FROM BITCOIN WHERE ID=1`;

        connection.query(sql, function (err, result) {
            if (err) throw err;

            var cprice = result[0].CPRICE;
            var proc = result[0].PROC;
            var ltyp = result[0].LTYP;
            var ltyp_s;

            if (ltyp == 0)
            {
                ltyp_s = "+";
            }
            else {
                ltyp_s = "-";
            }

            const guild = client.guilds.cache.get('853046031843065856');
            let btcchannel = guild.channels.cache.get('995736926348902401');

            const embed = new MessageEmbed()
                .setTitle("Current BTC Price")
                .setColor("#FFFFFF")
                .setDescription(`\`\`\`yaml\n1 BTC = ${parseFloat(cprice).toFixed(2)}\`\`\`\n\`\`\`fix\n${ltyp_s} ${parseFloat(proc).toFixed(8)}%\`\`\``)
                .setTimestamp();

            btcchannel.send({embeds: [embed]});
            connection.end();
        });

    }, 300000);
});

client.on("messageCreate", message => {
    if (message.author.bot) return 0;
    if(message.channel.name.includes("verify")) return 0;
    var xp, xpadd, needxp, level;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'eddy',
        password : 'TheYellowDik1!',
        database : 'discord'
    });
    connection.connect();
    var sql = `SELECT * FROM USERS WHERE userID=${message.author.id}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if(result > 0) return 0;
        else {
            xpadd = Math.floor(Math.random() * 10) + 1;
            xp = parseInt(result[0].uXp + xpadd);
            level = result[0].uLevel;
            if (level == 0)
            {
                needxp = 20;
            }
            else {
                needxp = parseInt(level * 50);
            }
            if (xp >= needxp)
            {
                level = parseInt(level + 1);
                var sql3 = `UPDATE USERS SET uLevel=${level} WHERE userID=${message.author.id}`;
                connection.query(sql3, function (err, result) {
                    if (err) throw err;
                });
                var sql4 = `UPDATE USERS SET uXp=0 WHERE userID=${message.author.id}`;
                connection.query(sql4, function (err, result) {
                    if (err) throw err;
                });
                message.channel.send(`${message.author}, You have reached **Level ${level}**!`);
            }
            else {
                var sql2 = `UPDATE USERS SET uXP=${xp} WHERE userID=${message.author.id}`;
                connection.query(sql2, function (err, result) {
                    if (err) throw err;
                });
            }
        }
        connection.end();
    });
});

client.login(token);