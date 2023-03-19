// Define the players
const player1 = 'X';
const player2 = 'O';
let clicks = 0

function getCell(row, col){
	const cell = document.getElementById(`c-${row}-${col}`)
	return cell.textContent || ''
}

function setCell(row, col, mark){
	const cell = document.getElementById(`c-${row}-${col}`)
	cell.textContent = mark
}

// Define the current player
let currentPlayer = player1;

// Function to check for winning combinations
function checkForWin() {
  let player
  // Check rows for winning combination
  for (let row = 0; row < 3; row++) {
  	player = getCell(row,0)
    if (player !== '' && player === getCell(row,1) && player === getCell(row,2)) {
      return player
    }
  }

  // Check columns for winning combination
  for (let col = 0; col < 3; col++) {
  	player = getCell(0,col)
    if (player !== '' && player === getCell(1,col) && player === getCell(2,col)) {
      return player
    }
  }

  // Check diagonals for winning combination
  player = getCell(0,0)
  if (player !== '' && player === getCell(1,1) && player === getCell(2,2)) {
    return player
  }
  player = getCell(0,2)
  if (player !== '' && getCell(0,2) && player === getCell(1,1) && player === getCell(2,0)) {
    return player
  }

  return null
}

// Function to switch to the other player's turn
function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

// Function to handle a player's move
function handleMove(row, col) {
  // Check if the cell is already occupied
  if (getCell(row,col) !== '') {
    alert('Cell is already occupied!');
    return;
  }

  clicks++

  // Update the game board
  setCell(row, col, currentPlayer);

  // Switch to the other player's turn
  switchPlayer();
}

// Function to reset the game
function resetGame() {
  // Clear the game board
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      setCell(row,col,'');
    }
  }

  // Reset the current player
  currentPlayer = player1;
  clicks = 0
}

// Select the node that will be observed for mutations
// Add event listeners to each cell on the game board
const ttt = document.querySelector('.tic-tac-toe');
const cells = ttt.querySelectorAll('td');
cells.forEach((cell) => {
  const [row, col] = cell.id.split('-').slice(1);
  cell.addEventListener('click', () => {
    handleMove(row, col);
  });
});


// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
	// Check for a winning combination
	requestAnimationFrame(()=>setTimeout(() => {
		const player = checkForWin()
		if (player){
			alert(`${player} wins!`);
			resetGame();
		}
		if (9 <= clicks){
			alert('Draw!')
			resetGame();
		}
	}, 0))
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
// Options for the observer (which mutations to observe)
observer.observe(ttt, { attributes: false, childList: true, subtree: true })

