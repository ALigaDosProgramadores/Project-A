/**
 * O Evento message é emitido toda vez que o bot recebe uma mensagem.
 * Podemos usar este evento como uma espécie de middleware para impedir vulnarabilidades ou outras coisas.
 */

module.exports = async (client, message) => {
  /** É uma boa pratica ignorar outros bots. isso faz o bot se auto-ignorar também.
   * E Também não entrara em um loop de spam...
  */

  if (message.author.bot) return
  if (message.channel.id === process.env.CANAL_APRESENTACAO) { return client.emit('present', message) }

  /** Outra boa pratica é ignorar qualquer mensagem que não começe com o prefixo escolhido do bot.
   * OBS: O prefixo é pego através da variavel PREFIX no arquivo .env.
  */

  if (message.content.indexOf(process.env.PREFIX) !== 0) return

  /** Separamos o nome do comando de seus argumentos que são passados ao comando em si. */
  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g)
  const command = args.shift().toLowerCase()

  /** Então se o comando existir ele irá ser executado.
   * Além disso o console também exibira o comando executado e quem o executou.
  */

  const cmd = client.commands.get(command)
  if (!cmd) return

  console.log(
    'log',
    `${message.author.username} (${message.author.id}) executou o comando: ${cmd.help.name}`,
  )
  if (cmd.conf.onlyguilds && !message.guild) return
  cmd.run(client, message, args)
}
