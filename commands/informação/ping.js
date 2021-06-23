const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setAuthor(`🏓 ${Math.round(client.ws.ping)} ms`)

    message.channel.send(embed)
  },

  conf: {},

  get help() {
    return {
      name: 'ping',
      description: 'Mostra a latência do bot.',
      usage: 'ping',
      category: 'Informação',
    }
  },
}
