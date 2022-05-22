const { SlashCommandBuilder } = require('@discordjs/builders');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '51.68.137.90',
  user     : 'bob',
  password : 'TheYellowDik1!',
  database : 'discord'
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verify your account'),
	async execute(interaction) {
    var check = new Boolean(true);
    connection.connect();
    connection.query('SHOW TABLES LIKE "USERS"', (error, results) => {
      if(error) return console.log(error);
      if(results == 0) {
        check = new Boolean(false);
        return interaction.reply("Contact with <@&856994837172322324> and report ERROR CODE 300 immediately!");
      }
    });
    connection.end();
    if (check === true) {
      connection.connect();
      connection.query(`SELECT userID from "USERS" where userID=${interaction.member.id}`, (error, results) => {
        if(error) return console.log(error);
        if(results == 0) {
          return interaction.reply("You need to read rules first and verify yourself on our website, if you don't know how to do this check tutorial (https://www.eyethecreator/discord) which is at the bottom of the page.")
        }
        else {
          connection.query(`UPDATE "USERS" SET verifed=1`, (error) => {
            if(error) return console.log(error);
          });
          const role = client.guilds.cache.find(r => r.name == "User");
          await interaction.member.roles.add(role);
        }
      });
      connection.end();
    }
	},
};