var Bot = require('slackbots')

var settings = {
    token: '',
    name: 'connect4'
}

var connect4 = new Bot(settings)

connect4.on('start', function(){
    connect4.postMessageToChannel('general', 'Would you like to play a game?')
})

connect4.on('message', function(data){
    console.log(data)
})

module.export = connect4