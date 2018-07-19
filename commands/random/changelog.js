// Command to message list of updates
const Commando = require('discord.js-commando');

class ChangelogCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'changelog',
            group: 'random',
            memberName: 'changelog',
            description: 'Displays list of new features and updates',
            examples: ['!changelog']
        })
    }

    run(msg) {
        return msg.say(`I can link twitch streams woo!  It's only a matter of time before I can link other stuff ( ͡° ͜ʖ ͡°)`); //NOTE:  .say() is Commando's version of message.channel.send
    }
};

module.exports = ChangelogCommand; //Makes sure that this gets exported so bot can import correctly