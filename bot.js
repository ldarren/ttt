function botMove(board) {
  // Check for any winning moves
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][0] !== '' && board[i][2] === '') {
      return [i, 2];
    } else if (board[i][0] === board[i][2] && board[i][0] !== '' && board[i][1] === '') {
      return [i, 1];
    } else if (board[i][1] === board[i][2] && board[i][1] !== '' && board[i][0] === '') {
      return [i, 0];
    } else if (board[0][i] === board[1][i] && board[0][i] !== '' && board[2][i] === '') {
      return [2, i];
    } else if (board[0][i] === board[2][i] && board[0][i] !== '' && board[1][i] === '') {
      return [1, i];
    } else if (board[1][i] === board[2][i] && board[1][i] !== '' && board[0][i] === '') {
      return [0, i];
    }
  }
  if (board[0][0] === board[1][1] && board[0][0] !== '' && board[2][2] === '') {
    return [2, 2];
  } else if (board[0][0] === board[2][2] && board[0][0] !== '' && board[1][1] === '') {
    return [1, 1];
  } else if (board[1][1] === board[2][2] && board[1][1] !== '' && board[0][0] === '') {
    return [0, 0];
  } else if (board[0][2] === board[1][1] && board[0][2] !== '' && board[2][0] === '') {
    return [2, 0];
  } else if (board[0][2] === board[2][0] && board[0][2] !== '' && board[1][1] === '') {
    return [1, 1];
  } else if (board[1][1] === board[2][0] && board[1][1] !== '' && board[0][2] === '') {
    return [0, 2];
  }

  // Check for any blocking moves
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][0] !== '' && board[i][2] === '') {
      return [i, 2];
    } else if (board[i][0] === board[i][2] && board[i][0] !== '' && board[i][1] === '') {
      return [i, 1];
    } else if (board[i][1] === board[i][2] && board[i][1] !== '' && board[i][0] === '') {
      return [i, 0];
    } else if (board[0][i] === board[1][i] && board[0][i] !== '' && board[2][i] === '') {
      return [2, i]
	} else if (board[0][i] === board[2][i] && board[0][i] !== '' && board[1][i] === '') {
      return [1, i];
    } else if (board[1][i] === board[2][i] && board[1][i] !== '' && board[0][i] === '') {
      return [0, i];
    }
  }
  if (board[0][0] === board[1][1] && board[0][0] !== '' && board[2][2] === '') {
    return [2, 2];
  } else if (board[0][0] === board[2][2] && board[0][0] !== '' && board[1][1] === '') {
    return [1, 1];
  } else if (board[1][1] === board[2][2] && board[1][1] !== '' && board[0][0] === '') {
    return [0, 0];
  } else if (board[0][2] === board[1][1] && board[0][2] !== '' && board[2][0] === '') {
    return [2, 0];
  } else if (board[0][2] === board[2][0] && board[0][2] !== '' && board[1][1] === '') {
    return [1, 1];
  } else if (board[1][1] === board[2][0] && board[1][1] !== '' && board[0][2] === '') {
    return [0, 2];
  }

  // If the center is free, take it
  if (board[1][1] === '') {
    return [1, 1];
  }

  // If the opponent has taken a corner, take the opposite corner
  if (board[0][0] !== '' && board[2][2] === '') {
    return [2, 2];
  } else if (board[2][2] !== '' && board[0][0] === '') {
    return [0, 0];
  } else if (board[0][2] !== '' && board[2][0] === '') {
    return [2, 0];
  } else if (board[2][0] !== '' && board[0][2] === '') {
    return [0, 2];
  }

  // If the opponent has taken a side, take the opposite side
  if (board[0][1] !== '' && board[2][1] === '') {
    return [2, 1];
  } else if (board[2][1] !== '' && board[0][1] === '') {
    return [0, 1];
  } else if (board[1][0] !== '' && board[1][2] === '') {
    return [1, 2];
  } else if (board[1][2] !== '' && board[1][0] === '') {
    return [1, 0];
  }

  // If no winning, blocking or center moves, take any corner
  if (board[0][0] === '') {
    return [0, 0];
  } else if (board[0][2] === '') {
    return [0, 2];
  } else if (board[2][0] === '') {
    return [2, 2];
  } else {
    return [2, 0];
  }
}

// Function to check if the game is over
function gameOver(board) {
  // Check rows for a win
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0];
    }
  }
  // Check columns for a win
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return board[0][i];
    }
  }
  // Check diagonals for a win
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }
  // Check if the board is full
  let isFull = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        isFull = false;
        break;
      }
    }
    if (!isFull) {
      break;
    }
  }
  if (isFull) {
    return 'tie';
  }
  // If the game is not over yet, return null
  return null;
}

// Function to display the board
function displayBoard(board) {
  console.log('   0  1  2');
  console.log('0: ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1: ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2: ' + board[2].join(' | '));
}

// Function to play the game
function playGame() {
  let board = [['', '', ''], ['', '', ''], ['', '', '']];
  let currentPlayer = 'X';
  let winner = null;

  while (!winner) {
    if (currentPlayer === 'X') {
      // Human player's turn
      displayBoard(board);
      let row = prompt('Enter row (0-2) for your move:');
      let col = prompt('Enter column (0-2) for your move:');
      if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        currentPlayer = 'O';
      } else {
        console.log('That space is already occupied. Try again.');
      }
    } else {
      // Computer player's turn
      let [row, col] = getComputerMove(board);
      board[row][col] = currentPlayer;
      currentPlayer = 'X';
    }
    winner = gameOver(board);
  }
  displayBoard(board);
  if (winner === 'tie') {
    console.log('The game is a tie.');
  } else {
    console.log('The winner is ' + winner + '!');
  }
}

// Play the game
playGame();

