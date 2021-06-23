/**
 * O Comando "delete" apagará determinada quantidade de mensagens.
*/

const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    if (!message.member) return

    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })) }

    if (!args[0]) {
      return message.reply(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, determine uma quantidade de mensagens para serem excluídas: \`\`\`${module.exports.help.usage}\`\`\``))
    }

    if (isNaN(args[0])) {
      return message.reply(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, apenas número é permitido!`))
    }

    if (parseInt(args[0]) > 99) {
      return message.reply(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, o valor máximo para ser deletado é de 99 mensagens!`))
    }

    await message.channel.bulkDelete(parseInt(args[0]) + 1)
      .catch(err => console.log(err))
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`${message.author}, foi/foram deleta(s) ${args[0]} mensagens! 🧹`)).then(m => m.delete({ timeout: 5000 }),
    )
  },

  conf: {
    onlyguilds: true,
  },

  get help() {
    return {
      name: 'delete',
      category: 'Moderação',
      description: 'O Comando "deletar" apagará determinada quantidade de mensagens.',
      usage: '!delete [1 - 99]',
      admin: true,
    }
  },
}
