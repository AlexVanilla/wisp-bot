const Commando = require('discord.js-commando');

module.exports = class SmashUltimateCountdown extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'smash-countdown',
            group: 'gaming',
            memberName: 'smash-countdown',
            description: 'Outputs time left for Smash Bros. Ultimate',
            examples: ['!smash-countdown']
        });
    }

    run(message) {
        // Set the date we're counting down to
        let countDownDate = new Date("Dec 7, 2018 00:00:00").getTime();

        // Get todays date and time
        let now = new Date().getTime();

        // Find the distance between now an the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            message.reply("Smash Bros Ultimate should already be out")
        }

        // Output the result
        message.reply(`There are ${days} days, ${hours} hours, ${minutes}, minutes, and ${seconds} seconds left for Super Smash Bros Ultimate to come out`);
    }
};