const { ChannelType } = require("discord.js");
const client = require("../index");
const { execute } = require("./ready");

module.exports = {
    name: "interactionCreate",
    once: false,
    /**
     * @param {import("discord.js").interaction} interaction
     */
    async execute(interaction) {
        if (
            !interaction.isChatInputCommand() && 
            !interaction.isContextMenuCommand() 
        )
         return;
        if (interaction.channel.type == ChannelType.DM) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (err) {
            console.log(err);
        }
    },
};