/** O Comando "Help" envia uma mensagem contendo as informações dos comandos. */

const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
  run(client, message, args) {
    if (!args[0]) {
      const categories = []

      fs.readdirSync('./commands/').forEach((dir) => {
        const commands = fs
          .readdirSync(`./commands/${dir}`)
          .filter(file => file.endsWith('.js'))
          .map(command => {
            const commandProps = require(`../../commands/${dir}/${command}`)
            return `\`${commandProps.help.name}\``
          })
          .filter(i => i !== undefined)

        if (commands.length > 0) categories.push({ name: dir.toUpperCase(), value: commands.join(' ') })
      })

      const helpembed = new Discord.MessageEmbed()
        .setAuthor('📃 Lista de comandos')
        .addFields(categories)
        .setDescription(`Use ${process.env.PREFIX}help + *nome do comando* para ver mais informações.`)
        .setColor(process.env.COLOR)
        .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=60,height=60')
        .setTimestamp()

      return message.channel.send(helpembed)
    } else {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()))

      if (!command) {
        const nocommandembed = new Discord.MessageEmbed()
          .setAuthor('Comando não encontrado!')
          .setDescription(`Use \`${process.env.PREFIX}help\` para listar todos os comandos ou \`${process.env.PREFIX}help\` + *comando*.`)
          .setColor(process.env.COLOR)
          .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=150,height=150')
          .setTimestamp()

        return message.channel.send(nocommandembed)
      }

      const helpcommandembed = new Discord.MessageEmbed()
        .setAuthor('📄 Informações do comando')
        .addField('Nome', command.help.name ? `\`${command.help.name}\`` : 'Sem nome')
        .addField('Como usar:', `\`${command.help.usage}\``)
        .addField('Descrição', command.help.description)
        .addField('Categoria', command.help.category)
        .setColor(process.env.COLOR)
        .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=150,height=150')
        .setTimestamp()

      return message.channel.send(helpcommandembed)
    }
  },

  conf: {},

  help: {
    name: 'help',
    category: 'Ajuda',
    description: 'Mostra todos os comandos disponíveis do bot.',
    usage: '!help',
  },
}
