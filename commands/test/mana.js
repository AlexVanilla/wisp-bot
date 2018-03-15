//NOTE:  This command let's users assign a role that just modifies their name color.
const commando = require('discord.js-commando');

//NOTE:  commands are classes exported with module.exports

class ManaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mana',  //name of the command
            group: 'test',  //command group that it is a part of
            memberName: 'mana',  //name of the command withing the group
            description: 'Change the color of your name', //help text displayed when help command is used
            examples: ['!mana']  //array of examples on how to use command
        });  //NOTE:  There's more properties but we'll stick with these for now
    
    }


    //NOTE:  After this we need a run method
    //TESTING
    run(msg) {
        return msg.say('Hi, I\'m awake!');  //NOTE:  .say() is commando's version of message.channel.send
    }

};

module.exports = ManaCommand;  //Makes sure that this gets exported so bot can import correctly