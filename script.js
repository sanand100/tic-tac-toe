//things we need to interact with
const cellEl = document.querySelectorAll('.cell');
const boardEl = document.querySelector('.board');
const resetBtn = document.querySelector('#reset-btn');
const playerTurn = document.querySelector('.playerTurn');
//constants
const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'o';
let PLAYER_X_TURN = false;
const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[0, 4, 8],
];

let gameProgress = {};
let playerXClicks = {};
let playerOClicks = {};
//add event listeners
resetBtn.addEventListener('click', resetGame);

//functions
//playGame function

function resetGame() {
	document.location.reload();
}
function playGame() {
	cellEl.forEach(function (cell) {
		playerXClicks = {};
		playerOClicks = {};
		cell.classList.remove(PLAYER_X_CLASS);
		cell.classList.remove(PLAYER_O_CLASS);
		cell.removeEventListener('click', handleClicks);
		cell.addEventListener('click', handleClicks, { once: true });
	});
}

function handleClicks(event) {
	const currentCell = event.target;
	const currentClass = PLAYER_X_TURN ? PLAYER_X_CLASS : PLAYER_O_CLASS;
	if (PLAYER_X_TURN) {
		currentCell.classList.add(PLAYER_X_CLASS);
		playerXClicks[currentCell.id] = 'player x';
		gameProgress[currentCell.id] = 'player x';
		PLAYER_X_TURN = !PLAYER_X_TURN;
		playerTurn.innerHTML = 'Player X';
		checkWinX();
		checkWinO();
	} else {
		currentCell.classList.add(PLAYER_O_CLASS);
		playerOClicks[currentCell.id] = 'player o';
		gameProgress[currentCell.id] = 'player o';
		PLAYER_X_TURN = !PLAYER_X_TURN;
		playerTurn.innerHTML = 'Player O';
		checkWinX();
		checkWinO();
	}
}

playGame();

let containsAllX = [];
function checkWinX() {
	for (let i = 0; i < winningCombos.length - 1; i++) {
		const currentWinningCombo = winningCombos[i];
		const arr2 = Object.getOwnPropertyNames(playerXClicks);
		const xKeys = arr2.map(Number);
		containsAllX[i] = currentWinningCombo.every((element) => {
			return xKeys.includes(element);
		});
	}
	// console.log(containsAllX);
	for (let i = 0; i < containsAllX.length; i++) {
		if (containsAllX[i]) {
			playerTurn.innerHTML = 'Player X Wins!!!!';
			return true;
		}
	}
}

let containsAllO = [];
function checkWinO() {
	for (let i = 0; i < winningCombos.length - 1; i++) {
		const currentWinningCombo = winningCombos[i];
		const arr2 = Object.getOwnPropertyNames(playerOClicks);
		const oKeys = arr2.map(Number);
		containsAllO[i] = currentWinningCombo.every((element) => {
			return oKeys.includes(element);
		});
	}
	// console.log(containsAlO);
	for (let i = 0; i < containsAllO.length; i++) {
		if (containsAllO[i]) {
			playerTurn.innerHTML = 'Player O Wins!!!!';
			return true;
		}
	}
}
