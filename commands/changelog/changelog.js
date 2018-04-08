//Command to message list of updates
const commando = require('discord.js-commando');

class ChangelogCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'changelog',
            group: 'changelog',
            memberName: 'update',
            description: 'Displays list of new features and updates',
            examples: ['!changelog']
        })
    }

    run(msg){
         return msg.say(`Master gave me the ability to search magic cards woot.  He was planning to discontinue me but he'll come back.  Like a depressing 0-12 loss streak in Dota 2.  They always come back...`);  //NOTE:  .say() is commando's version of message.channel.send
    }
};

module.exports = ChangelogCommand;  //Makes sure that this gets exported so bot can import correctly