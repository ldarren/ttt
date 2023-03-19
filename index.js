// Define the game board
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Define the players
const player1 = 'X';
const player2 = 'O';

// Define the current player
let currentPlayer = player1;

// Function to check for winning combinations
function checkForWin() {
  // Check rows for winning combination
  for (let row = 0; row < 3; row++) {
    if (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      return true;
    }
  }

  // Check columns for winning combination
  for (let col = 0; col < 3; col++) {
    if (board[0][col] !== '' && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      return true;
    }
  }

  // Check diagonals for winning combination
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
  }
  if (board[0][2] !== '' && board[0]  [2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
  }

  return false;
}

// Function to update the game board after a move
function updateBoard(row, col) {
  board[row][col] = currentPlayer;
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
  if (board[row][col] !== '') {
    alert('Cell is already occupied!');
    return;
  }

  // Update the game board
  updateBoard(row, col);

  // Update the HTML display
  const cell = document.getElementById(`cell-${row}-${col}`);
  cell.textContent = currentPlayer;

  // Check for a winning combination
  if (checkForWin()) {
    alert(`${currentPlayer} wins!`);
    resetGame();
    return;
  }

  // Switch to the other player's turn
  switchPlayer();
}

// Function to reset the game
function resetGame() {
  // Clear the game board
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      board[row][col] = '';
      const cell = document.getElementById(`cell-${row}-${col}`);
      cell.textContent = '';
    }
  }

  // Reset the current player
  currentPlayer = player1;
}

// Add event listeners to each cell on the game board
const cells = document.querySelectorAll('.tic-tac-toe td');
cells.forEach((cell) => {
  const [row, col] = cell.id.split('-').slice(1);
  cell.addEventListener('click', () => {
    handleMove(row, col);
  });
});

