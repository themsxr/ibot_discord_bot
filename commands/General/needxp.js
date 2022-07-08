module.exports = {
    name: "needxp",
    ownerOnly: false,
    run: async (client, message, args) => {

        var level, xp, needxp, hneed;
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
            level = result[0].uLevel;
            xp = result[0].uXp;
            
            if(level == 0)
            {
                needxp = 20;
            }
            else {
                needxp = parseInt(level * 50);
            }

            hneed = parseInt(needxp - xp);

            message.reply(`You need **${hneed} XP** to **Level ${parseInt(level+1)}** \n \`${xp} XP / ${needxp} XP\``);


            connection.end();
        });
    },
};
