/**
	* O Comando "tempmute" mutará determinado usuário temporariamente.
*/

const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })); }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const time = args[1]

    if (!member) {
      return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`*${message.author.username}, o uso correto do comando é: \`\`!tempmute @Membro\`\`.*`));
    }
    if (!time) {
      return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`**${message.author.username}**. especifique o tempo. ⏱`));
    }
    if (isNaN(time)) {
      return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`**${message.author.username}**. o tempo precisa ser numérico. ⏱`));
    }
    const mutedRole = message.guild.roles.cache.get(process.env.CARGO_MUTADO);
    if(!mutedRole) {
      return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`Esse cargo não foi encontrado no servidor! Verifique também seu arquivo de configuração.'`));
    }
    if(member.roles.cache.has(process.env.CARGO_MUTADO)) {
      return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`**${member.displayName}** já foi mutado(a)! 🤭`));
    }
    await member.roles.add(mutedRole)
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`**${member.displayName}** está mutado(a) temporariamente agora por ${ms(ms(time))}. 🤫`));
  
      setTimeout( function () {
        member.roles.remove(mutedRole)
        await message.channel.send(`${member.displayName} foi desmutado(a). 🙏`)
      }, ms(time));
  
    },
  conf: {},

  get help() {
    return {
      name: 'tempmute',
			category: 'Moderação',
      description: 'Mutará determinado usuário temporariamente.',
			usage: '!mute @usuário',
      admin: true
    }
  }
}