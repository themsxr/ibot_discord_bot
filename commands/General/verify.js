var fs = require('fs');
const { NULL } = require('mysql/lib/protocol/constants/types');
let profile_db = require("../../localdbs/profile_usrs.json");
let users_db = require("../../cryptogame_files/users_db.json");

module.exports = {
    name: "verify",
    ownerOnly: false,
    run: async (client, message, args) => {
        if(!message.channel.name.includes("verify")) return message.reply("You can't use verify command in this channel.").then(repliedMessage => {
            setTimeout(() => repliedMessage.delete(), 5000);
        }).catch(err => console.error);
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
                  user     : 'eddy',
                  password : 'TheYellowDik1!',
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
                        if(!profile_db[message.author.id])
                        {
                            profile_db[message.author.id] = {
                                
                                    bg: "bg0",
                                    bgs: ["bg0"],
                                    ach: []
                            }
                            
                            fs.writeFile("./localdbs/profile_usrs.json", JSON.stringify(profile_db), (err) => {
                                if (err) {
                                    message.reply("ERROR, Contact with our Discord Moderator!").then(repliedMessage => {
                                        setTimeout(() => repliedMessage.delete(), 5000);
                                      }).catch(err => console.error(err));
                                    return console.log(err);
                                }
                            });
                        }
                        if(!users_db[message.author.id])
                        {
                            users_db[message.author.id] = {
                                
                                    CPU: 0,
                                    GPU: 0,
                                    GPU_A: 0,
                                    RAM: 0,
                                    POWER: 0,
                                    POWER_A: 0,
                                    MOTHERBOARD: 0,
                                    MINERS: 1
                            }
                            
                            fs.writeFile("./cryptogame_files/users_db.json", JSON.stringify(users_db), (err) => {
                                if (err) {
                                    message.reply("ERROR, Contact with our Discord Moderator!").then(repliedMessage => {
                                        setTimeout(() => repliedMessage.delete(), 5000);
                                      }).catch(err => console.error(err));
                                    return console.log(err);
                                }
                            });
                        }
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