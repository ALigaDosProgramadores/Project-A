/**
  * O evento guildMemberAdd é emitido após um membro entrar.
*/

module.exports = async (client, member) => {
  const Discord = require('discord.js')

  const welcome = new Discord.MessageEmbed()
    .setColor(process.env.COLOR)
    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
    .setTitle('👋 Bem-vindo(a) a Liga dos Programadores!')
    .setDescription(`${member}, vá em <#824486458814365726> e leia os tópicos. E também não se esqueça de se apresentar em <#825028534006841354> :)`)
    .setImage('https://i.imgur.com/W2L4r1L.png')
    .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
    .setTimestamp()

  const join = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor(process.env.COLOR)
    .setAuthor('👤 Um novo membro entrou no servidor!')
    .setDescription(`${member} acabou de entrar.`)
    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
    .addField('**Entrou no Discord em**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.user.createdAt), true)
    .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
    .setTimestamp()

  member.guild.channels.cache.get(process.env.BOASVINDAS).send(welcome)
  member.guild.channels.cache.get(process.env.ENTRADA).send(join)
}

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate(template, date) {
  const specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function(t, item, i) {
    return t.split(specs[i]).join(item)
  }, template)
}
