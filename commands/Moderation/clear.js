module.exports = {
    name: "clear",
    ownerOnly: false,
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("You don't have permissions.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
        }
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Please use numbers or number bigger than 0.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
        }
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("Sorry, I can't delete messages.").then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            }).catch(err => console.error(err));
        }
        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`Deleted \`${deleted.size}\` messages.`).then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
              }).catch(err => console.error(err)))
    },
};