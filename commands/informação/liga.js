/**
* O Comando "liga" mostrará algumas informações da comunidade.
*/

const Discord = require('discord.js')

module.exports = {

  /**
    * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
    * Que passará os argumentos atraves do middleware que programamos.
  */

  run: function(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Liga dos Programadores')
      .setDescription('[Site da Liga](https://liga-dos-programadores.github.io/) e [GitHub da Liga](https://github.com/Liga-dos-Programadores)')
      .setImage('https://i.imgur.com/W2L4r1L.png')
      .setColor(process.env.COLOR)
      .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
      .setTimestamp()
    message.channel.send(embed)
  },
  /**
    * Aqui podemos colocar mais algumas configurações do comando.
  */
  conf: {},

  /**
    * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
  */
  get help() {
    return {
      name: 'liga',
      category: 'Informação',
      description: 'Mostrará algumas informações da comunidade.',
      usage: '!liga',
    }
  },
}
