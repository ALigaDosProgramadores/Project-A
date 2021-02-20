const Discord = require('discord.js')

module.exports = {

  run: async (client, message, args) => {
    const embed = new Discord.RichEmbed()
      .setDescription('[Clique aqui](https://discord.gg/fmnxSYR)')
      .setColor(global.CLIENT_DEFAULT_COLOR)

    message.channel.send(embed)
  },

  conf: {},

  get help () {
    return {
      name: 'invite',
      description: 'Recebe o convite permanente para a Liga dos Programadores.',
      usage: 'invite',
      category: 'Info'
    }
  }
}
