/**
 * O Comando "tias" (Try it and see / Tente isso e veja) irá enviar um vídeo de auto ajuda para aqueles que estão com determinada dúvida.
*/

module.exports = {

  /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

  run: async function(client, message, args) {
    message.channel.send('> 👀 Tente isso e veja 🤡 \n\n https://tryitands.ee/tias.mp4')
  },

  conf: {},

  /**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

  get help() {
    return {
      name: 'tias',
      category: 'Útil',
      description: 'Irá enviar um video de auto ajuda para aqueles que estão com determinada dúvida.',
      usage: '!tias',
    }
  },
}
