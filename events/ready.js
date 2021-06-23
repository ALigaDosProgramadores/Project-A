module.exports = (client) => {
  const activities = [
    `${process.env.PREFIX}help para obter ajuda.`,
    `${client.users.cache.size} usuários`,
  ]
  let i = 0
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: 'WATCHING',
  }), 30000)
  client.user
    .setStatus('online')
    .catch(console.log)
  console.log(`Eu estou online agora, meu nome é ${client.user.username}. Há ${client.users.cache.size} usuário(s) online no servidor!`)
}
