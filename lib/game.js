
function Game(p1, p2){
    
    this.p1 = p1
    this.p2 = p2
    this.winner = null
    this.turn = p2
    this.width = 7
    this.height = 6
    this.max = this.width * this.height
    this.length = 4
    
    this.initBoard = function(){
        var board = []
        for(var i = 0; i < this.max; i++){
            board[i] = null
        }

        return board
    }
    this.board = this.initBoard()
    this.placePiece = function(column){
        if(position < 1 || position > this.width){
            console.log('bad move')
            return {ok: 'false', message: 'Not a valid move', board: this.board}
        }

        var row = this.height
        while(row > 0){
            var position = this.width*(row - 1) + column - 1
            if(this.validMove(position)){
                console.log('turn',this.turn)
                this.board[position] = this.turn === this.p1 ? 1 : 2
                this.nextTurn()
                this.checkWinner(position)
                return {board: this.board}                
            }
            row--
        }

        return {message: 'No remaining spots in column ' + column, board: this.board}
    }
    this.validMove = function(position){
        return this.board[position] === null
    }
    this.nextTurn = function(){
        this.turn = (this.turn === this.p1) ? this.p2 : this.p1
    }

    this.printBoard = function(){
        var ret = ''
        for(var i = 0; i < this.max; i++){
            if(i > 0){
                ret += i % this.width === 0 ? '\n' : ' '
            }
            ret += this.board[i] !== null ? this.board[i] : '_'
        }

        console.log(ret + '\n\n')
        return ret
    }

    this.checkWinner = function(position){
        var chainLength = 1
        var player = this.board[position]

        if(this.checkHorizontal(position, player) ||
           this.checkVertical(position, player) ||
           this.checkDiagonal(position, player)
           ){
            console.log(player + ' is the winner!')

            this.winner = player === 1 ? this.p1 : this.p2
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