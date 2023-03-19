const ttt = document.querySelector('.tic-tac-toe')
const cells = [...ttt.querySelectorAll('td')]

// Define the players
const players = ['X', '0']

// Define the current player
let currentPlayer = 0

let clicks = 0

const paths = [
	[0, 1, 2], // 0
	[3, 4, 5], // 1
	[6, 7, 8], // 2
	[0, 3, 6], // 3
	[1, 4, 7], // 4
	[2, 5, 8], // 5
	[0, 4, 8], // 6
	[2, 4, 6], // 7
]

const rpaths = {
	0: [paths[0], paths[3], paths[6]],
	1: [paths[0], paths[4]],
	2: [paths[0], paths[5], paths[7]],
	3: [paths[1], paths[3]],
	4: [paths[1], paths[4], paths[6], paths[7]],
	5: [paths[1], paths[5]],
	6: [paths[2], paths[3], paths[7]],
	7: [paths[2], paths[4]],
	8: [paths[2], paths[5], paths[6]],
}

function getCell(idx){
	const cell = cells[idx]
	return cell.textContent || ''
}

function setCell(idx, mark){
	const cell = cells[idx]
	cell.textContent = mark
}

// Function to check for winning combinations
function checkForWin(cell) {
	const idx = cells.indexOf(cell)
	const checks = rpaths[idx]
	const mark = getCell(idx)
	if (checks.some(check => check.every(c => cells[c].textContent === mark))) return mark
}

// Function to switch to the other player's turn
function switchPlayer() {
	currentPlayer = currentPlayer ^ 1
}

// Function to handle a player's move
function handleMove(idx) {
	// Check if the cell is already occupied
	if (getCell(idx)) {
		alert('Cell is already occupied!')
		return
	}

	clicks++

	// Update the game board
	setCell(idx, players[currentPlayer])

	// Switch to the other player's turn
	switchPlayer()
}

// Function to reset the game
function resetGame() {
	// Clear the game board
	cells.forEach((celli, idx) => setCell(idx, ''))

	// Reset the current player
	currentPlayer = 0
	clicks = 0
}

// Select the node that will be observed for mutations
// Add event listeners to each cell on the game board
cells.forEach((cell, idx) => {
	cell.addEventListener('click', () => {
		handleMove(idx)
	})
})


// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
	// Check for a winning combination
	requestAnimationFrame(()=>setTimeout(() => {
		for (const mutate of mutationList) {
			const mark = checkForWin(mutate.target)
			if (mark){
				alert(`${mark} wins!`)
				resetGame()
				break
			}
		}
		if (9 <= clicks){
			alert('Draw!')
			resetGame()
		}
	}, 0))
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)

// Start observing the target node for configured mutations
// Options for the observer (which mutations to observe)
observer.observe(ttt, { attributes: false, childList: true, subtree: true })

