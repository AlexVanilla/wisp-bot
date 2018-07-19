const Commando = require('discord.js-commando');

 module.exports = class DiceRollCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Rolls a die',
            examples: ['!roll <dice number>'],
            args: [
                {
                    key: 'number',
                    prompt: 'I need an integer to roll',
                    type: 'integer',
                    validate: number => {
                        number = parseInt(number); //Convert to integer
                        if(Number.isInteger(number) && number != 0) return true;
                        return 'I need a whole number.  Like 1, 5, 4, etc';
                    }
                }
            ]
        });
    }

    run(message, { number }) {
        message.reply("You rolled a:  " + (Math.floor(Math.random() * number) + 1));
    }
};