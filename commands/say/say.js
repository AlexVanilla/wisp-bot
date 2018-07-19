const Commando = require('discord.js-commando');

class Say extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'say',
            memberName: 'say',
            description: 'Allows Wisp bot to talk',
            args: [{
                key: 'text',
                prompt: 'What would you like the bot to say?',
                type: 'string'
            }]
        });
    }

    hasPermission(msg) {
        if(!this.client.isOwner(msg.author)) return 'Only certain people can use this command.';
        return true;
    }

    run(msg, { text }) {
        // What it's essentially doing is that it will delete my message and Wisp bot will copy what I say
        msg.delete();
        return msg.say(text)
    }
};

module.exports = Say;