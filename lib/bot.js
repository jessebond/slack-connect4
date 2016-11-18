var Bot = require('slackbots')
var Game = require('./game')

function Connect4Bot(token){
    var _this = this
    this.settings = {
        token: token,
        name: 'connect4'
    }

    this.general
    this.game = null
    this.botId
    this.bot = new Bot(this.settings)
    this.users = []
    
    // on bot start, grabs a bunch of userful information
    this.onStart = function(){
        _this.bot.postMessageToChannel('general', 'Would you like to play a game?')
        _this.bot.getChannel('general').then(function(response){
            this.general = response
        })
        _this.bot.getUsers().then(function(response){
            response.members.forEach(function(user) {
                if(user.name === settings.name){
                    _this.botId = user.id
                }
            }, _this);
            console.log('botid', _this.botId)
        })
    }

    // checks if correct type of message
    this.onMessage = function(data){
        if(data.type === 'message'){
            console.log('\t&' + (data.username ? data.username : data.user) + '> ' + data.text)
            _this.parseMessage(data)
        }
    }

    // Message parser
    this.parseMessage = function(data){
        var matches = data.text.match(/play <@(\w+)>/i)

        if(matches && matches.length === 2 && matches[1] !== data.user){
            _this.startGame(data.user, matches[1])
        }
    }

    // creates game if not exists
    this.startGame = function(p1, p2){
        if(_this.game){
            console.log('Already a game exists')
        }
        console.log('==Creating new game')
        _this.updateUsers().then(function(){
            var username1 = _this.getUserName(p1)
            var username2 = _this.getUserName(p2)

            if(!username1 || !username2){
                console.log('bad usernames', user1)
                return
            }

            console.log('**Starting game between ' + username1 + ' and ' + username2)
            _this.game = new Game(username1, username2)
            _this.messageUser(_this.game.turn, _this.game.printBoard())
        })
    }

    // updates list of users
    this.updateUsers = function(){
        return _this.bot.getUsers().then(function(response){
            _this.users = response.members
            console.log('updated users')
        })
    }

    // grabs username from userId
    this.getUserName = function(userId){
        var user = _this.users.filter(function(user){
            return user.id === userId
        })[0]
        console.log('userId:', userId, 'name', user.name)
        
        return user.name
    }

    // wrapper
    this.messageUser = function(username, text){
        console.log('messageUser',username, text)
        _this.bot.postMessageToUser(username, text).always(function(response){
            console.log('response', response)
        })
    }

    this.bot.on('message', this.onMessage)
    this.bot.on('start', this.onStart)
}

module.exports = Connect4Bot