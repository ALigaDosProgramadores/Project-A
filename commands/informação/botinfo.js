/**
  * O Comando "botinfo" mostrará informações do bot.
*/

const Discord = require('discord.js')
const moment = require('moment')

moment.locale('pt-br')

module.exports = {
  run: function(client, message, args) {
    const inline = true
    const date = client.user.createdAt
    const userName = client.user.username
    const status = {
      online: '`🟢` Online',
      offline: '`⚫` Offline',
    }
    const link = 'https://github.com/Liga-dos-Programadores/Project-A'

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}?size=1024`)
      .setAuthor('🤖 Minhas informações')
      .addField('**Meu nome**', userName)
      .addField('**Meu ID**', client.user.id)
      .addField('**Estou online a**', moment().to(client.startTime, true))
      .addField('**Fui criado em**', moment(date).format('DD/MM/YYYY, à\\s HH:mm:ss'))
      .addField('🔗 **Meu código fonte**', link)
      .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
      .setTimestamp()

    if (client.user.presence.status) {
      embed.addField(
        '**Status**',
        status[client.user.presence.status],
        inline,
        true,
      )
    }

    message.channel.send(embed)
  },

  conf: {},

  get help() {
    return {
      name: 'botinfo',
      category: 'Informação',
      description: 'Mostra informações do bot.',
      usage: '!botinfo',
    }
  },
}
