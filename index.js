if (process.version.slice(1).split('.')[0] < 8) {
  throw new Error(
    'Node 8.0 ou superior é necessário. Atualize o Node em seu sistema',
  )
}

require('dotenv').config()

const { Client, Collection } = require('discord.js')
const { loadCommands, loadEvents } = require('./utils')
const client = new Client()

client.commands = new Collection()
client.startTime = Date.now()

loadCommands(client.commands, './commands')
loadEvents('./events', client)

client.login(process.env.AUTH_TOKEN)
