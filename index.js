require('dotenv').config(); // Access env variables
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const axios = require('axios');

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
    updateActivity();
})

setInterval(updateActivity, 3600000) // Change Activites every hour

function updateActivity() {
    const activityTypes = ['PLAYING', 'LISTENING', 'WATCHING', 'STREAMING'];
    const activities = {
        WATCHING: ['Hanebado', 'Free Season 3', 'Youtube', 'Korean Mukbangs', 'Scryfall Senpai', 'Overlord Season 3', 'Cells At Work', 'Crunchyroll', 'Netflix', 'Udemy Courses'],
        PLAYING: ['Hearthstone', 'MTGA', 'League of Legends', 'Dota 2', 'Super Smash Bros. Ultimate', 'Fortnite', 'PUBG', 'r/outside', 'Visual Novels', 'the trumpet'],
        LISTENING: ['Motivational Speeches', 'Country music', 'Dubstep', 'K-pop idol groups', 'J-pop idol groups', 'Soundcloud', 'Scryfall senpai\'s voice', 'Podcasts', 'ClariS', 'Studio Ghibli OST']
    }
    const streamers = ['DisguisedToastHS', 'ZeRo', 'NairoMK', 'HSdogdog', 'mang0', 'Hungrybox', 'Mew2King', 'Day9tv', 'CONtv', 'xell'];
    let axiosUrl = 'https://api.twitch.tv/helix/streams?first=10';
    const axiosConfig = {
        // NOTE: Twitch API requires a Client-ID
        headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID
        }
    }

    // Randomly choose what activity Wisp bot is doing
    let currentActivityType = activityTypes[(Math.floor(Math.random() * activityTypes.length - 1) + 1)];
    let currentActivity = null;

    let options = {
        type: currentActivityType
    }

    if (currentActivityType !== 'STREAMING') {
        currentActivity = activities[currentActivityType][(Math.floor(Math.random() * activities[currentActivityType].length - 1) + 1)];
        console.log('SETTING ACTIVITY', currentActivityType, currentActivity);
        client.user.setActivity(currentActivity, options)
            .catch(error => {
                console.error('ERROR SETTING ACTIVITY', error.response.data);
            })
    } else {
        // If Wisp bot streaming, use Twitch API to find live streamers
        // build url to make API call
        for (streamer of streamers) {
            axiosUrl += `&user_login=${streamer}`;
        }

        axios.get(axiosUrl, axiosConfig).then(response => {
                let liveStreamers = response.data.data;
                // Randomly choose one of the streamers that is currently live
                let theChosenOne = liveStreamers[(Math.floor(Math.random() * liveStreamers.length))];
                // TODO: try to use async/await to make code a bit more readable

                // Get live streamers name name
                // https://api.twitch.tv/helix/users?id="USER_ID"
                axios.get(`https://api.twitch.tv/helix/users?id=${theChosenOne.user_id}`, axiosConfig).then(response => {
                    let streamerName = response.data.data[0].display_name;
                    let login = response.data.data[0].login;

                    console.log('SETTING TWTICH STREAM', streamerName, login);
                    client.user.setActivity(streamerName, {
                            type: 'STREAMING',
                            url: `https://www.twitch.tv/${login}`
                        })
                        .catch(error => {
                            console.log('ERROR SETTING TWITCH STREAMER', error.response.data);
                        })
                });
            })
            .catch(error => {
                console.log('ERROR GETTING TWITCH INFO', error.response.data);
            })

    }
}

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
        sender.send("Hello, I have censored that meme")
    }
});

client.login(process.env.BOT_TOKEN);