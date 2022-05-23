module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {
        
        client.user.setActivity("ETC", {
            type: "WATCHING",
            name: "ETC"
        });
    }
}
