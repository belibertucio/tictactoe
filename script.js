const cells = document.querySelectorAll('.cell');
let gameActive = false; // Set gameActive to false (initially)
let currentPlayer = 'X'; // Set default starting player
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach(cell => {
  cell.addEventListener('click', cellClicked);
});

function startGame() {
  const startingPlayerSelect = document.getElementById('startingPlayer');
  currentPlayer = startingPlayerSelect.value;
  gameActive = true;

  // Other initialization code (e.g., adding event listeners, etc.)

  // Clear the starting player selection UI
  const startButtonDiv = document.querySelector('.start-button');
  startButtonDiv.style.display = 'none';
}

function cellClicked() {
  const cellIndex = parseInt(this.id);
  if (cells[cellIndex].innerText === '' && gameActive) {
    cells[cellIndex].innerText = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer === 'X' ? 'red' : 'blue'); // Add class based on the current player
    cells[cellIndex].style.backgroundColor = currentPlayer === 'X' ? 'lightcoral' : 'lightblue'; // Change cell bg color
    if (checkWin()) {
      announceWinner();
      gameActive = false;
    } else if (checkDraw()) {
      announceDraw();
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  if (!gameActive) {
    setTimeout(resetGame, 1500);
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('red', 'blue'); // Remove color classes
    cell.style.backgroundColor = ''; // Reset cell background color
  });
  currentPlayer = 'X';
  gameActive = true;

  // Reset background color to default after starting a new game
  document.body.classList.remove('red-bg-body', 'blue-bg-body');

  // Display the starting player selection UI after resetting the game
  const startButtonDiv = document.querySelector('.start-button');
  startButtonDiv.style.display = 'block';
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].innerText === currentPlayer;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => {
    return cell.innerText !== '';
  });
}

function announceWinner() {
  const notification = document.getElementById('notification');
  const winnerText = document.getElementById('winnerText');
  winnerText.innerText = `Player ${currentPlayer} wins!`;

  notification.classList.add(currentPlayer === 'X' ? 'red-bg' : 'blue-bg', 'show');

  document.body.classList.add(currentPlayer === 'X' ? 'red-bg-body' : 'blue-bg-body');

  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hide');

    // Reset background color to default after 0.5s (to match the transition duration)
    setTimeout(() => {
      document.body.classList.remove('red-bg-body', 'blue-bg-body');
      notification.classList.remove('red-bg', 'blue-bg', 'hide');
    }, 500);
  }, 2000);
}

function announceDraw() {
  const notification = document.getElementById('notification');
  const winnerText = document.getElementById('winnerText');
  winnerText.innerText = `It's a draw!`;

  notification.classList.add('show');
  notification.classList.add('draw-bg'); // Applying a separate class for draw background color
  setTimeout(() => {
    notification.classList.remove('show', 'draw-bg');
  }, 2000); // Hide notification after 2 seconds
}

function changeButtonColor() {
  const startingPlayerSelect = document.getElementById('startingPlayer');
  const startButton = document.querySelector('.start-button button');

  if (startingPlayerSelect.value === 'X') {
    startButton.classList.remove('blue-bg');
    startButton.classList.add('red-bg');
  } else {
    startButton.classList.remove('red-bg');
    startButton.classList.add('blue-bg');
  }
}

// Calling the function initially to set the initial color based on the default selected player
changeButtonColor();