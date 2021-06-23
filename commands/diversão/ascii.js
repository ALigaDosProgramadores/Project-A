/**
  * O Comando "ascii" Converte uma palavra para o código ASCII.
*/

const figlet = require('figlet')

module.exports = {

  /**
    * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
    * Que passará os argumentos atraves do middleware que programamos.
  */

  run: function(client, message, args) {
    if (!args[0]) return message.channel.send('> **Por favor coloque algum texto.**')

    const msg = args.join(' ')

    figlet.text(msg, function(err, data) {
      if (err) {
        console.log('Algo errado aconteceu')
        console.dir(err)
      }
      if (data.length > 2000) return message.channel.send('**Envie um texto com menos de 2000 caracteres!**')

      message.channel.send('```' + data + '```')
    })
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
      name: 'ascii',
      category: 'Diversão',
      description: 'Converte uma palavra para o código ASCII.',
      usage: '!ascii',
    }
  },
}
