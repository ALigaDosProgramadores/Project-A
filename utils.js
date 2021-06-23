const { readdirSync, lstatSync } = require('fs')

/*
 * Carrega commandos que estão na pasta **commands** e em grupos de subpastas
 */
function loadCommands(collection, directory) {
  const cmdFiles = readdirSync(directory)
  console.log(
    'log',
    `Carregando o total de ${cmdFiles.length} comandos em ${directory}`,
  )

  for (const file of cmdFiles) {
    try {
      const path = `${directory}/${file}`

      if (file.endsWith('.js')) {
        const command = require(path)
        console.log('log', `Carregando comando: ${command.help.name}`)

        collection.set(command.help.name, command)

        if (command.help.aliases) {
          command.help.aliases.forEach((alias) =>
            collection.set(alias, command),
          )
        }
      } else if (lstatSync(path).isDirectory()) {
        loadCommands(collection, path)
      }
    } catch (e) {
      console.error(`Não foi possível carregar o comando ${file}: ${e}`)
    }
  }
}

function loadEvents(directory, client) {
  const eventFiles = readdirSync(directory)
  console.log('log', `Carregando o total de ${eventFiles.length} eventos`)
  for (const file of eventFiles) {
    const eventName = file.split('.')[0]
    const event = require(`./events/${file}`)

    try {
      client.on(eventName, event.bind(null, client))
    } catch (error) {
      console.error(`Não foi possível carregar o evento ${eventName}: error`)
    }
  }
}

exports.loadEvents = loadEvents
exports.loadCommands = loadCommands
