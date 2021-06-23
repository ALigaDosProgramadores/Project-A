/**
 * O Comando "ban" banirá determinado usuário do servidor.
*/

const Discord = require('discord.js')

module.exports = {

  run: async function(client, message, args) {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })) }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    const reason = args.slice(1).join(' ')

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setAuthor('Confirme o banimento 🚀', message.author.displayAvatarURL())
      .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
      .setDescription(`**Usuário que será banido: ${member.user}** \n **Motivo: **${reason}.\n\nClique na reação ✅ para confirmar. \n Se não, clique em ❌ para cancelar.`)
      .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
      .setTimestamp()

    if (!user) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, o uso correto do comando é: \`\`!ban @usuario [motivo]\`\`.`))
    }

    if (!reason) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, coloque o motivo. 📃`))
    }

    const filter = (reaction, userFilter) => {
      return ['✅', '❌'].includes(reaction.emoji.name) && userFilter.id === message.author.id
    }

    const msg = await message.channel.send(embed)
    await msg.react('✅')
    await msg.react('❌')

    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const reaction = collected.first()

        if (reaction.emoji.name === '✅') {
          message.guild.members.ban(user)
            .then(() => message.reply('usuário banido! 🚀'))
            .catch(() => message.channel.send('Não foi possível banir o usuário. '))
        } else {
          msg.delete()
        }
      })
      .catch(() => {
        message.reply('Banimento cancelado.')
      })
  },
  conf: {},

  get help() {
    return {
      name: 'ban',
      category: 'Moderação',
      description: 'Banirá determinado usuário do servidor.',
      usage: '!ban @usuário [motivo]',
      admin: true,
    }
  },
}
