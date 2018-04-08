const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');
const Weather = require('weather-js'); //NOTE:  not implemented yet
const mtg = require('mtgsdk'); //NOTE:  Not sure if need this

/*
client.on("ready", () => {
    client.user.setPresence({ game: { name: "with my code", type: 0 } });
});
*/
const client = new Commando.Client({
    commandPrefix: '!', //What you must type first to use bot command
    owner: process.env.OWNER_ID //Specify that I'm the owner so I can have full access to the bot from anywhere
}); //NOTE:  commando is an extension of discord client

client.registry
    //Register custom command groups
    .registerGroups([
        ["test", `Under Testing (shouldn't be working right now)`],
        ["random", "Random Commands"],
        ["changelog", "Other"]
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
    client.user.setGame('Mergic der Gertering');
    //NOTE:  If setGame() isn't working, use setActivity();
})

client.on("message", (message) => {
    if (message.content.startsWith("Wisp bot")) {
        message.channel.send("*Beep boop*");
    }
});

client.on('message', function (message) {
    if (message.content === 'test') {
        message.reply('Test 1 2 3'); //Bot will @ back to user
        //message.channel.sendMessage('You are master *beep boop*');  //Send channel msg
    }
});


//Global settings
const prefix = '~' // This is the prefix, you can change it to whatever you want


// listener Event:  Message Recieved (this will run every time a message is recieved)
client.on("message", message => {

    /*
    NOTE: remnants for weather function.

        //Variables
        let sender = message.author; // The person who sent the message
        let msg = message.content.toUpperCase(); // Takes the message, and makes it all upercase
        let cont = message.content.slice(prefix.length).split(" "); //This variable slices off the prefix
        let args 
        //Weather command - requires weather.js
        if (msg.startsWith(prefix + 'WEATHER')) {
            weather.find({search: args.join(" "), degreeType: 'F'}, function (err, result){
                if(err) {
                    message.send(err);
                }
                
                message.channel.send(JSON.stringify(result[0].current, null, 2)); //This posts the CURRENT part of the FIRST result
                
            });  
        }    */

    //Anti 2 stock joke function
    if (message.content === '2 stock' || message.content === '2-stock' || message.content === '2stock' || message.content === 'two stock') {

        //Deleting specific messages (messages that are not an ID for me)
        if (message.channel.id === process.env.CHANNEL_ID1 || message.channel.id === process.env.CHANNEL_ID2) {
            message.delete() // This deletes message
        }

        // Tweaked the function because it would return navy copypasta
        sender.send("hello")
    }
});

client.login(process.env.BOT_TOKEN);
