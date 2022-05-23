const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    aliases: ["h", "commands"],
    usage: '!help <command>',
    category: "Information",
    description: "Commands list",
    ownerOnly: false,
    run: async (client, message, args) => {

        
    },
};
