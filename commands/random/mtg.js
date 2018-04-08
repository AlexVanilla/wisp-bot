const commando = require('discord.js-commando');
const mtg = require('mtgsdk');

module.exports = class MtgSearch extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mtg',
            group: 'random',
            memberName: 'mtg',
            description: 'Searches mtg image',
            examples: ['!mtg <card name>'],
            args: [{
                key: 'mtgName',
                prompt: 'I need a magic card name.  To clarify, Magic the Gathering',
                type: 'string',
            }]
        });
    };

    //FIXME: Some cards get wrong hit such as if you look up !mtg Fire it doesn't return split card.  Need to make exact match feature
    run(message, { mtgName }) {
        mtg.card.where({ name: mtgName }).then(results => {
            //If there is no card found with what the user asked for
            if(Object.keys(results).length === 0){
                message.reply(`I can't find the card you're looking for.  I have failed you :( Do make sure you spelled it right though.`)
                return;
            }
            //Take out cards from the Vanguard set AND if they don't have a multiverse id
            results = results.filter(card => card.set !== 'VAN' && card.multiverseid);
            //sort by multiverse id (the one with the highest multiverse id should be the most recent card printed)
            results.sort(function(a,b){
                return b.multiverseid - a.multiverseid;
            });
            //Have wisp bot output (hopefully intended) result
            let output = results[0].name; //This is used to take out the name in the Set.names object below
            message.reply(results[0].imageUrl);
            //If there were different names in the result, have Wisp bot message the results
            var names = new Set();  //Using a Set object to take out duplicates
            for(var i = 0; i < results.length; i++){
                names.add(results[i].name); //Adding the names to the Set object
            }
            names.delete(output); //Remove the name that was outputted
            //Checks if there's more than 1 unique names in the result.  If so, have wisp bot output the list of different names
            if(names.size > 1){
                message.say(`It seems that I have more than one result for the name you entered.  Here are the names if you want to look them up.`);
                let list = ''; //Made this to have Wisp bot output the list vs looping through where he sends the name one at a time
                names.forEach(card => { list += (card + "\n")});
                message.say(list);
            }
        });
    };
};