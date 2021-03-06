
function Game(p1, p2){
    
    this.p1 = p1
    this.p2 = p2
    this.winner = null
    this.turn = p2
    this.width = 7
    this.height = 6
    this.max = this.width * this.height
    this.length = 4
    this.remainingMoves = this.height * this.width
    this.pieces = {
        p1: ':black_circle:',
        p2: ':red_circle:',
        empty: ':white_large_square:'
    }
    
    this.initBoard = function(){
        var board = []
        for(var i = 0; i < this.max; i++){
            board[i] = null
        }

        return board
    }
    this.board = this.initBoard()
    this.placePiece = function(column){
        if(column < 1 || column > this.width){
            console.log('bad move')
            return {ok: false, message: 'Not a valid move'}
        }
        console.log('placePiece_', column)
        console.log(this.printBoard(true))
        var row = this.height
        while(row > 0){
            var position = this.width*(row - 1) + column - 1
            console.log('attempt',position, this.width, row, this.height, this.width*(row - 1), this.width*(row - 1) + column)
            if(this.validMove(position)){
                console.log('turn',this.turn)
                this.board[position] = this.turn === this.p1 ? this.pieces.p1 : this.pieces.p2
                this.remainingMoves--
                this.checkWinner(position)
                this.nextTurn()
                var winner = this.winner
                return {ok: true, winner: winner}               
            }
            row--
        }

        return {ok: false, message: 'No remaining spots in column ' + column}
    }
    this.validMove = function(position){
        return this.board[position] === null
    }
    this.nextTurn = function(){
        this.turn = (this.turn === this.p1) ? this.p2 : this.p1
    }

    this.printBoard = function(debug){
        var ret = ''
        for(var i = 0; i < this.max; i++){
            if(i > 0){
                ret += i % this.width === 0 ? '\n' : ' '
            }
            
            var piece = this.board[i]
            if(debug){
                if(piece === null){
                    ret += '_'
                } else if(piece === this.pieces.p1){
                    ret += '1'
                } else {
                    ret += '2'
                }
            } else {
                ret += piece !== null ? piece : this.pieces.empty
            }
        }

        return ret
    }

    this.checkWinner = function(position){
        var chainLength = 1
        var player = this.board[position]

        if(this.checkHorizontal(position, player) ||
           this.checkVertical(position, player) ||
           this.checkDiagonal(position, player)
           ){
            console.log(this.turn + ' is the winner!')

            this.winner = player === this.pieces.p1 ? this.p1 : this.p2
            console.log('winner is : ' + this.winner)
            return
        } else if(this.remainingMoves === 0){
            this.winner = -1
            console.log("It's a draw")
            return
        }
        console.log('No winner yet')
    }

    this.checkHorizontal = function(position, player){
        var length = 0
        var newPos = position - (position % this.width)
        
        for(var i = 0; i < this.width; i++){
            if(this.board[newPos] === player){
                length++
                if(length === this.length){
                    console.log('horizontal winner')
                    return true
                }
            } else {
                length = 0
            }
            newPos++
        }   
    }

    this.checkVertical = function(position, player){
        var length = 0
        var newPos = position % this.width
        
        for(var i = 0; i < this.height; i++){
            if(this.board[newPos] === player){
                length++
                if(length === this.length){
                    console.log('vertical winner')
                    return true
                }
            } else {
                length = 0
            }
            newPos += this.width
        }
    }

    this.checkDiagonal = function(position, player){
        var length = 0
        //  diagonal \
        var newPos = position - (position % this.width)*(this.width + 1)
        var count = 0

        while(newPos < this.max && count <= this.width && count <= this.height){
            if(this.board[newPos] === player){
                length++
                if(length === this.length){
                    console.log('diagonal winner')
                    return true
                }
            } else {
                length = 0
            }
            count++
            newPos += this.width + 1
        }

        //  diagonal /
        length = 0
        newPos = position + (position % this.width)*(this.width -1)
        count = 0
        while(newPos > 0 && count <= this.width && count <= this.height){
            if(this.board[newPos] === player){
                length++
                if(length === this.length){
                    console.log('diagonal winner')
                    return true
                }
            } else {
                length = 0
            }
            count++
            newPos += -this.width + 1
        }

        return false
    }
}

module.exports = Game