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
        // start game command
        var matches = data.text.match(/play <@(\w+)>/i)
        if(matches && matches.length === 2 && matches[1] !== data.user){
            _this.startGame(data.user, matches[1])
            return
        }

        // place piece command
        matches = data.text.match(/^(\d+)$/i)
        if(matches && matches.length === 2){
            _this.placePiece(matches[1], data.user)
            return
        }
    }

    // creates game if not exists
    this.startGame = function(p1, p2){
        if(_this.game){
            console.log('Already a game exists')
            return
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
            _this.sendBoard()
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

    // sends the board to current player and waits on response
    this.sendBoard = function(username, text){
        console.log('messageUser',_this.game.turn, _this.game.printBoard(true))
        _this.bot.postMessageToUser(_this.game.turn, _this.game.printBoard())
    }

    // places a piece on the board
    this.placePiece = function(column, player){
        if(!_this.game || _this.getUserName(player) !== _this.game.turn){
            // no game or not the current player's turn
            return
        }

        var result = _this.game.placePiece(parseInt(column))
        if(result.ok){
            _this.sendBoard(_this.game.turn, _this.game.printBoard())

            if(result.winner){
                // draw
                if(result.winner === -1){
                    _this.bot.postMessageToChannel('general', 'Connect 4 was a draw!')
                } else {
                    _this.bot.postMessageToChannel('general', result.winner + ' won connect 4!')
                }

                // reset game
                _this.game = null
            }
        } else {
            _this.bot.postMessageToUser(_this.game.turn, result.message)
        }
    }

    this.bot.on('message', this.onMessage)
    this.bot.on('start', this.onStart)
}

module.exports = Connect4Bot