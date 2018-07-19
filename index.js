require('dotenv').config(); // Access env variables
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

const client = new Commando.Client({
    commandPrefix: '!', // What you must type first to use bot command
    owner: process.env.OWNER_ID // Specify that I'm the owner so I can have full access to the bot from anywhere
});

client.registry
    //Register custom command groups
    .registerGroups([
        ["gaming", "Game related commands"],
        ["test", `Under Testing (shouldn't be working right now)`],
        ["random", "Random Commands"],
        ["say", "Admin only commands"]
    ])
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory 
    //NOTE:  __dirname means current directory
    .registerCommandsIn(__dirname + "/commands")

/*
//You can disable default commands in here.  Just pass an object that contains command name and set the property to 'false
.registerDefaultCommands({
    help: false
});*/


client.on('ready', () => {
    console.log('Wisp is logged in');
    client.user.setActivity('Anime', {
        type: 'WATCHING'
    });
})

setInterval(() => {
    // const activities = []
    const activityTypes = ['PLAYING', 'LISTENING', 'WATCHING'];
    const activities = {
        WATCHING: ['Hanebado', 'Free Season 3', 'Youtube', 'Korean Mukbangs', 'Scryfall Senpai', 'Overlord Season 3', 'Cells At Work', 'Crunchyroll', 'Netflix', 'Udemy Courses'],
        PLAYING: ['Hearthstone', 'MTGA', 'League of Legends', 'Dota 2', 'Super Smash Bros. Ultimate', 'Fortnite', 'PUBG', 'r/outside', 'Visual Novels', 'the trumpet'],
        LISTENING: ['Motivational Speeches', 'Country music', 'Dubstep', 'K-pop idol groups', 'J-pop idol groups', 'Soundcloud', 'Scryfall senpai\'s voice', 'Podcasts', 'ClariS', 'Studio Ghibli OST']
    }

    // TODO: Do streaming using Twitch api
    // const streamingActivities = ['Papa Zero', 'Nairo', 'DisguisedToast', 'Mango', 'Mew2King', ]

    // Randomly choose what activity Wisp bot is doing
    let currentActivityType = activityTypes[(Math.floor(Math.random() * activityTypes.length - 1) + 1)];
    let currentActivity = activities[currentActivityType][(Math.floor(Math.random() * activities[currentActivityType].length - 1) + 1)]

    console.log(currentActivityType, currentActivity);
    client.user.setActivity(currentActivity, {
        type: currentActivityType
    });
}, 3600000) // Change Activites every hour

client.on('message', (message) => {
    if (message.content.startsWith("Wisp bot")) {
        message.channel.send("*Beep boop*");
    }
});

const censoredWords = ['2 stock', '2-stock', '2stock', 'two stock']
// listener Event:  Message Recieved (this will run every time a message is recieved)
client.on("message", message => {
    //Anti 2 stock joke function
    if (censoredWords.includes(message.content)) {
        //Deleting specific messages (messages that are not an ID for me)
        if (message.channel.id === process.env.CHANNEL_ID1 || message.channel.id === process.env.CHANNEL_ID2) {
            message.delete() // This deletes message
        }

        // Tweaked the function because it would return navy copypasta
        sender.send("hello")
    }
});

client.login(process.env.BOT_TOKEN);