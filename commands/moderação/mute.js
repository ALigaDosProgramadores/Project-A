/**
* O Comando "mute" mutará determinado usuário.
*/

const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })) }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, o uso correto do comando é: \`\`!mute @Usuário\`\`.`))
    }

    const mutedRole = message.guild.roles.cache.get(process.env.CARGO_MUTADO)
    if (!mutedRole) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, esse cargo não foi encontrado no servidor! Verifique também seu arquivo de configuração.`))
    }
    if (member.roles.cache.has(process.env.CARGO_MUTADO)) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, **${member}** já foi mutado(a)! 🤭`))
    }
    await member.roles.add(mutedRole)
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`${message.author}, **${member}** está mutado(a) agora! 🤫`))
  },
  conf: {},

  get help() {
    return {
      name: 'mute',
      category: 'Moderação',
      description: 'Mutará determinado usuário.',
      usage: '!mute @usuário',
      admin: true,
    }
  },
}
