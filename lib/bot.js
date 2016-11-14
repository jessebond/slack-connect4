var Bot = require('slackbots')

var settings = {
    token: '',
    name: 'connect4'
}

var testbot = new Bot(settings)

testbot.on('start', function(){
    testbot.postMessageToChannel('general', 'test gen')
    testbot.postMessageToUser('jessebond315', 'test user')
})

module.export = testbot