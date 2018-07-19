/*
const Weather = require('weather-js'); //NOTE:  not implemented yet
            // NOTE: remnants for weather function.

            // Variables
            let sender = message.author; // The person who sent the message
            let msg = message.content.toUpperCase(); // Takes the message, and makes it all upercase
            let cont = message.content.slice(prefix.length).split(" "); //This variable slices off the prefix
            // let args
            //Weather command - requires weather.js
            if (msg.startsWith(prefix + 'WEATHER')) {
                weather.find({
                    search: args.join(" "),
                    degreeType: 'F'
                }, function (err, result) {
                    if (err) {
                        message.send(err);
                    }

                    message.channel.send(JSON.stringify(result[0].current, null, 2)); //This posts the CURRENT part of the FIRST result

                });
            }
*/