
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
    let isWinner = false;

//adds click handlers to grab the player selections and process them
    const spots = Array.from(document.getElementsByClassName('box'));
        spots.forEach((box) => {
            box.addEventListener('click', (event) => {
                validInput = checkBoxValidClick(event);
                if(validInput == true){
                    addMark(currentPlayer, board, event);
                   isWinner = determineWinner(board, currentPlayer, isWinner);
                   if(isWinner == true){
                    alert("Winner!");
                   }
                    currentPlayer = togglePlayer(currentPlayer);
                    
                    
                }
                else{
                    alert("This box has already been played!")
                }
            });
        });
 //function which checks for valid selection in an empty square       
    function checkBoxValidClick(event){
        boxClicked = Number(event.target.getAttribute("data-index"));
        if(gameBoard.board[boxClicked] == '')
        {
            return true;
        }
        else{
            return false;
        }
    }
//function which adds the given players symbol
    function addMark(player, board, event){
       let boxClicked = Number(event.target.getAttribute("data-index"));
       board[boxClicked] = player.symbol;
        return board;
    }
//function which toggles the player making their move
    function togglePlayer(currentPlayer){
        if(currentPlayer == player1){
            currentPlayer = player2;
        }
        else{
            currentPlayer = player1;
        }
        return currentPlayer;
    }

function determineWinner(board, player, isWinner){
let winningCombos =     [
                    [0, 1, 2], 
                    [0,3,6], 
                    [0,4,8],
                    [1,4,7],
                    [2,5,8],
                    [2,4,6], 
                    [3,4,5], 
                    [6,7,8]
                            ];
    for(i=0; i<winningCombos.length; i++){
        const [a, b, c] = winningCombos[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            isWinner = true;
        }
    }
    console.log(board);
    return isWinner;
}



    return{
        startGame,
    }

})();

