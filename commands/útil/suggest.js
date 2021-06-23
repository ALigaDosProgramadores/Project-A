/**
 * O Comando "suggest" irá receber a sugestão do membro e irá enviá-la para um canal expecífico.
*/

const Discord = require('discord.js')

module.exports = {

  /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

  run: async function(client, message, args) {
    const msg = args.join(' ')

    if (!msg) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription(`${message.author}, digite: \`\`!suggest + [sua sugestão]\`\` :mailbox_with_no_mail:`))
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor('📩 Nova sugestão', message.author.displayAvatarURL())
      .setDescription(`**Sugestão de: ${message.author}**\n${msg}`)
      .setColor(process.env.COLOR)
      .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
      .setTimestamp()

    const m = await client.channels.cache.get(process.env.SUGESTOES).send(embed)
    m.react('👍')
    m.react('👎')
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`${message.author}, sua sugestão foi enviada no canal de sugestões! A staff irá analizar e logo irá enviar um feedback. 📬`))
  },

  conf: {},

  /**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

  get help() {
    return {
      name: 'suggest',
      category: 'Útil',
      description: 'Pega uma sugestão do usuário e envia para determinado canal.',
      usage: '!suggest',
    }
  },
}
