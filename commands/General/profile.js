const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "profile",
    usage: '!profile or !profile @User#1234',
    category: "General",
    description: "Displays your or user profile",
    ownerOnly: false,
    run: async (client, message, args) => {
        // make profile card for user and when you mention user
        // use mysql to insert level, xp, achievements (table USERS)
        // use mysql to check what background is in use (default bg0) (table PROFILE)
        // there will be many backgrounds to buy so if you want to create shop with inventory or shop there in table PROFILE is array backgrounds: []
        // every background is like bg0, bg1, bg2 etc. etc. only special background like bg_premium1 are different with name
        // every background is in profile_backgrounds directory
    },
};
