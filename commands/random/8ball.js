const commando = require('discord.js-commando');

module.exports = class EightBallCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: '8ball',
            group: 'random',
            memberName: '8ball',
            description:  '\"High tech\" fortune telling mechanism',
            examples: ['!8ball <question>'],
            args: [
                {
                    key: 'text',
                    prompt: 'I need a question first!  I\'m not some piece of meat that you can order around willy nilly :(',
                    type: 'string'
                }
            ]
        });
    }

    run(msg){
        //First 20 are from standard 8 ball replies.  Anything afterwards are just custom replies
        let fortune = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            'Don\'t count on it',
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful',
            'Lol nah fam',
            'Ask yourself, \"What would the great Gaben do?\"',
            'Idk but you should play Dota 2',
            'Yaaaaaaassss'
        ];

        //Generate random number between 0 and max array length of fortune[]
        let i = Math.floor(Math.random() * fortune.length);
        msg.reply(fortune[i]);
    }
};