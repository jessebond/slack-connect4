var Bot = require('slackbots')
var Game = require('./game')

function Connect4Bot(token){
    this.settings = {
        token: token,
        name: 'connect4'
    }
    this.general
    this.game = null
    this.botId
    this.bot = new Bot(this.settings)
    this.bot.on('start', function(){
        this.bot.postMessageToChannel('general', 'Would you like to play a game?')
        this.bot.getChannel('general').then(function(response){
            this.general = response
        })
        this.bot.getUsers().then(function(response){
            response.members.forEach(function(user) {
                if(user.name === settings.name){
                    this.botId = user.id
                }
            }, this);
            console.log('botid', this.botId)
        }.bind(this))
    }.bind(this))

    this.parse = function(data){
        var matches = data.text.match(/play <@(\w+)>/i)
        console.log(matches)
        if(matches && matches.length === 2 && matches[1] !== data.user){
            this.startGame(data.user, matches[1])
        }
    }.bind(this)

    this.startGame = function(p1, p2){
        if(this.game){
            console.log('Already a game exists')
        }
        console.log('**Starting game between ' + p1 + ' and ' + p2)
    }.bind(this)

    this.bot.on('message', function(data){
        if(data.type === 'message'){
            console.log(data)
            this.parse(data)
        }
    }.bind(this))
}

module.exports = Connect4Bot