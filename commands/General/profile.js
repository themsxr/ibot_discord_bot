var fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');
let profile_db = require("../../localdbs/profile_usrs.json");

module.exports = {
    name: "profile",
    ownerOnly: false,
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.member;
        if(user.bot) return message.reply("You can't display bot's profile.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        if(!user) return message.reply("Can't find this user.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error(err));

        var mysql = require('mysql');
        var connection = mysql.createConnection({
        host     : '51.68.137.90',
        user     : 'sammy',
        password : 'TheYellowDik1!',
        database : 'discord'
        });
        connection.connect();
        var sql = `SELECT * FROM USERS WHERE userID=${user.id}`;

        connection.query(sql, async function (err, result) {

            const level = result[0].uLevel;
            const btcs = parseFloat(result[0].uBitcoin).toFixed(8);
            const username = user.user.username;

            var tcolor;

            if(profile_db[user.id].bg == "bg0")
            {
                tcolor = "#FFFFFF"
            }

            const canvas = createCanvas(1024, 512)
            const ctx = canvas.getContext('2d')
            const backgroundimage = await loadImage(`./profile_backgrounds/${profile_db[user.id].bg}.png`)
            
            ctx.drawImage(backgroundimage, 0, 0, canvas.width, canvas.height)

            // User Level
            ctx.font = '41px sans-serif'
            ctx.textAlign = 'left'
            ctx.fillStyle = `${tcolor}`
            ctx.fillText(level, 140, 369)

            // User BTCs
            ctx.font = '41px sans-serif'
            ctx.textAlign = 'left'
            ctx.fillStyle = `${tcolor}`
            ctx.fillText(btcs, 100, 448)

            // username
            ctx.font = '30px sans-serif'
            ctx.textAlign = 'left'
            ctx.fillStyle = `${tcolor}`
            ctx.fillText(username.toUpperCase(), 230, 155)

            // Avatar radius
            ctx.arc(123.5, 138, 95, 0, Math.PI * 2, true)
            ctx.stroke()
            ctx.closePath()
            ctx.clip()

            const avatar = await loadImage(user.user.displayAvatarURL({ format: 'jpg' }))
            ctx.drawImage(avatar, 25, 30, 220, 220)

            const attachment = new MessageAttachment(canvas.toBuffer(), 'profile.png')
            
            message.channel.send({files: [attachment]});

            connection.end();
        });
    },
};
