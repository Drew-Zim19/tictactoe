
const gameBoard = (() => {
    const board = ['','','','','','','','',''];
    return {board}
})();

//factory for players

const player = (name, symbol) => {
    return {name, symbol}
}


// const startButton = document.querySelector('.startButton');
// startButton.addEventListener('click', () => {
//     Game.startGame();
// });

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
    let isTie = false;
    
    const spots = Array.from(document.getElementsByClassName('box'));
    spots.forEach((box) => {
        box.addEventListener('click', (event) => {
            
            validInput = checkBoxValidClick(event);
            if(validInput == true){
                    if(gameOver == false){
                    addMark(currentPlayer, board, event);
                    isWinner = determineWinner(isWinner);
                    if(isWinner == true){
                        gameOver = endGame(currentPlayer);
                    }
                    else{currentPlayer = togglePlayer(currentPlayer);
                    playerTurnDivController(currentPlayer);
                    isTie = tieCheck(board, currentPlayer, isTie);
                    }}
                    
            }else if(gameOver == false && isTie == false){
            alert("This box has already been played!")
            }
      });
    });

//adds click handlers to grab the player selections and process them
//if valid click and nobody has played there, game adds a mark
//game determines if that mark created a winning combo
//if winner, game ends 
   
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
       gameBoard.board[boxClicked] = player.symbol;
       event.target.innerHTML = player.symbol;
        return gameBoard.board;
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
//function which determines the winner of the game on each click 
function determineWinner(isWinner){
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
//loop through all the possible winning combos. If the board has a winning combo, the current player is the winner and isWinner is set to true
    for(i=0; i<winningCombos.length; i++){
        const [a, b, c] = winningCombos[i];
        if(gameBoard.board[a] && gameBoard.board[a] === gameBoard.board[b] && gameBoard.board[a] === gameBoard.board[c]){
            isWinner = true;
        }
    }
    return isWinner;
}

function tieCheck(isTie){
    if(!gameBoard.board.includes('') && isWinner == false){

   let topDiv = document.createElement('div');
   topDiv.classList.add("playerMove");
   topDiv.innerHTML = `It's a tie!`;
   const topDivOld = document.querySelector(".playerMove");
   topDivOld.replaceWith(topDiv);
    }

    return isTie;
}
//function which replaces the div text at the top to the winning player text
function endGame(currentPlayer){
   let topDiv = document.createElement('div');
   let gameOver = true;
   topDiv.classList.add("playerMove");
   topDiv.innerHTML = `${currentPlayer.name} is the winner!`;
   const topDivOld = document.querySelector(".playerMove");
   topDivOld.replaceWith(topDiv);
   isWinner = false;
   currentPlayer = player1;
   return gameOver;
};

//function which resets the board and board div html to nothing. Resets all variables to default
//attached to Reset button

let resetButton = document.getElementsByClassName("reset");
resetButton[0].addEventListener('click', () => {
        isWinner = false;
        isTie = false;
        validInput = true;
        currentPlayer = player1;
        gameBoard.board = ['','','','','','','','',''];
        playerTurnDivController(currentPlayer);
        let boxHTML = document.querySelectorAll('.box');
            for(i=0; i<boxHTML.length; i++){
                boxHTML[i].innerHTML = '';
            }
        let newBoard = document.createElement('div');
        newBoard.classList.add("board");
        let oldBoard = document.getElementsByClassName("board");
        oldBoard = newBoard;
        gameOver = false;
        });

//function which determines the current players turn shown on the screen

function playerTurnDivController(currentPlayer){
    let topDiv = document.createElement('div');
    topDiv.classList.add("playerMove");
    topDiv.innerHTML = `${currentPlayer.name}'s turn.`;
    const topDivOld = document.querySelector(".playerMove");
    topDivOld.replaceWith(topDiv);
}

return{
    startGame,
}

})();

