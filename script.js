// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

// DOM elements
let cells, statusElement, resetButton, resetScoreButton, scoreXElement, scoreOElement;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Initialize the game
function initializeGame() {
    cells = document.querySelectorAll('[data-cell]');
    statusElement = document.getElementById('status');
    resetButton = document.getElementById('resetBtn');
    resetScoreButton = document.getElementById('resetScoreBtn');
    scoreXElement = document.getElementById('scoreX');
    scoreOElement = document.getElementById('scoreO');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
    
    resetButton.addEventListener('click', resetGame);
    resetScoreButton.addEventListener('click', resetScore);
    
    updateStatus();
    updateScoreDisplay();
}

// Handle cell click
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }
    
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());
    
    if (checkWin()) {
        gameActive = false;
        highlightWinningCells();
        updateScore();
        updateStatus(`Player ${currentPlayer} wins!`);
        return;
    }
    
    if (checkDraw()) {
        gameActive = false;
        updateStatus("It's a draw!");
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Check for win
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' && 
               board[a] === board[b] && 
               board[a] === board[c];
    });
}

// Check for draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// Highlight winning cells
function highlightWinningCells() {
    const winningCombination = winningCombinations.find(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' && 
               board[a] === board[b] && 
               board[a] === board[c];
    });
    
    if (winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('winning');
        });
    }
}

// Update score
function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
    } else {
        scoreO++;
    }
    updateScoreDisplay();
}

// Update score display
function updateScoreDisplay() {
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}

// Update status
function updateStatus(message = null) {
    if (message) {
        statusElement.textContent = message;
    } else {
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
    });
    
    updateStatus();
}

// Reset score
function resetScore() {
    scoreX = 0;
    scoreO = 0;
    updateScoreDisplay();
    resetGame();
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGame);
