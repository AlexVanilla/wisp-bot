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
    client.user.setActivity('NairoMK', {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/nairomk'
    });
})


// TODO: clean up code and implement the STREAMING activity type at some point
// NOTE: reference to Twitch api
setInterval(() => {
        // const activities = []
        const activityTypes = ['PLAYING', 'LISTENING', 'WATCHING'];
        const activities = {
            WATCHING: ['Hanebado', 'Free Season 3', 'Youtube', 'Korean Mukbangs', 'Scryfall Senpai', 'Overlord Season 3', 'Cells At Work', 'Crunchyroll', 'Netflix', 'Udemy Courses'],
            PLAYING: ['Hearthstone', 'MTGA', 'League of Legends', 'Dota 2', 'Super Smash Bros. Ultimate', 'Fortnite', 'PUBG', 'r/outside', 'Visual Novels', 'the trumpet'],
            LISTENING: ['Motivational Speeches', 'Country music', 'Dubstep', 'K-pop idol groups', 'J-pop idol groups', 'Soundcloud', 'Scryfall senpai\'s voice', 'Podcasts', 'ClariS', 'Studio Ghibli OST']
        }

        // const streamingActivities = ['Papa Zero', 'Nairo', 'DisguisedToast', 'Mango', 'Mew2King', ]

        // Randomly choose what activity Wisp bot is doing
        let currentActivityType = activityTypes[(Math.floor(Math.random() * activityTypes.length - 1) + 1)];
        let currentActivity = activities[currentActivityType][(Math.floor(Math.random() * activities[currentActivityType].length - 1) + 1)]


        // If Wisp bot streaming, use Twitch API to find live streamers

        // https: //api.twitch.tv/helix/streams?first=10&user_login=DisguisedToastHS&user_login=NairoMK&user_login=WagamamaTV

        /*
        // NOTE: not sure if this curl command will work
        curl -H `Client-ID: ${process.env.TWITCH_CLIENT_ID}` \
        -X GET 'https://api.twitch.tv/helix/streams?first=10&user_login=DisguisedToastHS&user_login=NairoMK&user_login=WagamamaTV'
        */

        // data[].user_id

        // https://api.twitch.tv/helix/users?id=87204022
        // data[].display_name
        const streamers = ['DisguisedToastHS', 'ZeRo', 'NairoMK', 'HSdogdog', 'mang0', 'Hungrybox', 'Mew2King', 'Day9tv', 'CONtv'];

        // Append twitch url
        let options = {
            type: currentActivityType
        }

        if (currentActivityType === 'STREAMING') {
            options.url = 'https://www.twitch.tv/' + streamers[0] // TODO: array length for streamers

        }

        console.log(currentActivityType, currentActivity, options);
        client.user.setActivity(currentActivity, options);
    },
    6000) // Change Activites every 30 mins
// 1800000

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