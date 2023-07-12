
const gameBoard = (() => {
    const board = ['','','','','','','','',''];
    return {board}
})();

//factory for players

const player = (name, symbol) => {
    return {name, symbol}
}


const startButton = document.querySelector('.startButton');
startButton.addEventListener('click', () => {
    Game.startGame();
});

const Game = (() => {

    function startGame(){
        alert("Let's begin!");
    }

    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');
    let gameOver = false;
    let board = gameBoard.board;
    let validInput = true;
    let currentPlayer = player1;

    const spots = Array.from(document.getElementsByClassName('box'));
        spots.forEach((box) => {
            box.addEventListener('click', (event) => {
                validInput = checkBoxValidClick(event);
                if(validInput == true){
                    addMark(currentPlayer, board, event);
                   currentPlayer = togglePlayer(currentPlayer);
                    console.log(board);
                    console.log(currentPlayer);
                    //determineWinner(board);
                }
                else{
                    alert("This box has already been played!")
                }
            });
        });

    function checkBoxValidClick(event){
        boxClicked = Number(event.target.getAttribute("data-index"));
        if(gameBoard.board[boxClicked - 1] == '')
        {
            return true;
        }
        else{
            return false;
        }
    }

    function addMark(player, board, event){
       let boxClicked = Number(event.target.getAttribute("data-index"));
       board[boxClicked - 1] = player.symbol;
        return board;
    }

    function togglePlayer(currentPlayer){
        if(currentPlayer == player1){
            currentPlayer = player2;
        }
        else{
            currentPlayer = player1;
        }
        return currentPlayer;
    }

    return{
        startGame,
    }

})();

