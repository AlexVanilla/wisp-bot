const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class stream extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'stream',
            group: 'gaming',
            memberName: 'stream',
            description: 'Streams a twitch user',
            examples: ['!stream <user name>']
        });
    }

    run(message) {
        // FIXME: this doesn't allow chatbot to update its activity.  find way to update
        const client = new Commando.Client({
            commandPrefix: '!',
            owner: process.env.OWNER_ID
        });

        const axiosConfig = {
            // NOTE: Twitch API requires a Client-ID
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID
            }
        }

        let axiosUrl = `https://api.twitch.tv/helix/streams?first=10&user_login=${message.argString.trim()}`;

        // axios call
        axios.get(axiosUrl, axiosConfig).then(response => {
                let user = response.data.data[0];
                if (!user) {
                    message.say(`I couldn't find the user ${message.argString.trim()} 😣`);
                }

                let title = user.title;

                // https://api.twitch.tv/helix/users?id="USER_ID"
                axios.get(`https://api.twitch.tv/helix/users?id=${user.user_id}`, axiosConfig).then(response => {
                    let responseUser = response.data.data[0];

                    let streamerName = responseUser.display_name;
                    let login = responseUser.login;
                    let profileImage = responseUser.profile_image_url;
                    let description = responseUser.description;

                    message.say(`Streaming ${streamerName}`)
                    message.say(`https://www.twitch.tv/${login}`)
                    message.say(`Description:  ${title}`)

                    client.user.setActivity(streamerName, {
                            type: 'STREAMING',
                            url: `https://www.twitch.tv/${login}`
                        })
                        .catch(error => {
                            console.error('Error setting activity', error.response.data);
                        })
                });
            })
            .catch(error => {
                console.error('ERROR', error.response.data);
            })
    }
};