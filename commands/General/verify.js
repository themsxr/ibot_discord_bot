var fs = require('fs');
module.exports = {
    name: "verify",
    category: "General",
    description: "Verify your account",
    ownerOnly: false,
    run: async (client, message, args) => {
        if(!args[0]) return message.reply("Please provide verification code first.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
          }).catch(err => console.error(err));
        const usrcode = args[0].toUpperCase();
        fs.readFile('./codes.txt', function (err, data) {
            if (err) throw err;
            if(data.includes(`${usrcode}`)){
                var mysql      = require('mysql');
                var connection = mysql.createConnection({
                  host     : 'localhost',
                  port  : 3306,
                  user     : '?',
                  password : '?',
                  database : 'discord'
                });
                connection.connect();
                var sql = `INSERT INTO USERS (userID) VALUES (${message.member.id})`;
                var sql2 = `SELECT * FROM USERS WHERE userID=${message.member.id}`;
                connection.query(sql2, function (err, result) {
                    if (err) throw err;
                    if (result.length === 0) {
                        connection.query(sql, function (err, result) {
                            if (err) throw err;
                        });
                        connection.end();
                        let role = message.guild.roles.cache.find(role => role.name === 'User')
                        message.member.roles.add(role)
                        return message.reply("Your account has been successfully verified.").then(repliedMessage => {
                            setTimeout(() => repliedMessage.delete(), 5000);
                          }).catch(err => console.error(err));
                    }
                    else {
                        return message.reply("You're already verifed.").then(repliedMessage => {
                            setTimeout(() => repliedMessage.delete(), 5000);
                          }).catch(err => console.error(err));
                    }
                });
            }
            else {
                return message.reply("Your verification code is incorrect.").then(repliedMessage => {
                    setTimeout(() => repliedMessage.delete(), 5000);
                  }).catch(err => console.error(err));
            }
          });
    },
};