

var Connect4Bot = require('./lib/bot')
var Game = require('./lib/game')

var token = process.argv[2]
if(!token){
    console.log('No token provided, exiting')
    process.exit()
}

bot = new Connect4Bot(token)

//console.log(newGame)
//newGame.placePiece(6)

//newGame.placePiece(7)
//newGame.printBoard()
// newGame.placePiece(1)
// newGame.printBoard()
// newGame.placePiece(2)
// newGame.printBoard()
// newGame.placePiece(2)
// newGame.printBoard()
// newGame.placePiece(2)
// newGame.placePiece(3)
// newGame.printBoard()
// newGame.placePiece(3)
// newGame.placePiece(3)
// newGame.printBoard()
// newGame.placePiece(3)
// newGame.printBoard()
// newGame.placePiece(3)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()
// newGame.placePiece(5)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()

// newGame.placePiece(2)
// newGame.printBoard()

// vertical

// newGame.printBoard()
// newGame.placePiece(5)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()
// newGame.printBoard()
// newGame.placePiece(5)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()
// newGame.printBoard()
// newGame.placePiece(5)
// newGame.printBoard()
// newGame.placePiece(4)
// newGame.printBoard()