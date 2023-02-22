const { 
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data:new ContextMenuCommandBuilder()
        .setName("유저정보")
        .setType(ApplicationCommandType.User),
    /**
     * 
     * @param {import('discord.js').UserContextMenuCommandInteraction } interaction
     */

    async execute (interaction) {
        await interaction.deferReply();
        const User = interaction.targetUser;
        console.log(User);
        let bot;
        if (User.bot == true) {
            bot = "봇입니다";
        } else {
            bot = "봇이 아닙니다";
        }
        const embed = new EmbedBuilder()
            .setTitle(`${User.tag}님의 유저정보`)
            .setColor(User.accentColor || "Green")
            .setTimestamp()
            .setThumbnail(`${User.displayAvatarURL({ dynmic:true })}`)
            .addFields(
                { name: "아이디", value: `**${User.id}**` },
                { name: "봇여부", value: `**${bot}**` },
                { name: "뱃지", value: `**${User.flags.toArray().join(", ") || "없음"}**` },
                {
                    name: "유저이름",
                    value: `**${User.username}#${User.discriminator}**`,
                }
            );
        interaction.editReply({ embeds : [embed] });
    },
};