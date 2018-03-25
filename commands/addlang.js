/**
 * O Comando "addlang" adicionará os cargos aos membros.
 */

const LanguageManager = require("../utils/languagemanager");
const langmgr = new LanguageManager();

/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
 * Que passará os argumentos atraves do middleware que programamos.
 */
exports.run = (client, message, args) => {

    /** Verificamos se o número de argumentos é válido. */
    if (args.length < 1) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${message.settings.PREFIX}${this.help.usage}\`\`\``);

    /** Então verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */
    let langs = langmgr.getLanguages();
    let role = langs.find(l => l.toLowerCase() === args.join(' '));

    if (!role)
    {
        const emoji = message.guild.emojis.find("name", "thinkkk");
        message.react(emoji || "🤔");
        return message.reply(`?? Talvez isso possa ajuda-lo: \`\`\`${message.settings.PREFIX}addlang [${langs.join("|")}]\`\`\``);
    }

    /** Logo então atribuimos o cargo ao membro e mandamos uma mensagem como resposta
     * Caso o membro já possua o cargo então é enviada uma mensagem retornando.
     */
    if (!message.member.roles.has(role.id))
    {
        message.member.addRole(role);
        return message.reply(`*Beep boop!@* Agora você possui o cargo **${role.name}**`);
    }
    else
    {
        return message.reply(`Você já possui este cargo!`);
    }

};

/** Aqui podemos colocar mais algumas configurações do comando. */
exports.conf = {};

/** Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc... */
exports.help = {
    name: "addlang",
    category: "Moderação",
    description: "Adiciona um cargo de alguma linguagem de programação a si próprio.",
    usage: "addlang [java|c|c++|c#|python|kotlin|scala|go|javascript|php|swift|ruby|elixir|rust|assembly]"
};
