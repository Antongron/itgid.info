const heartsContainer = document.getElementById('hearts-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let totalHearts = 0; // Track total hearts generated
let timeLeft = 30;
let speedMultiplier = 2; // Initial speed multiplier
let gameInterval;
let heartInterval;

// Function to create a falling heart
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = `${Math.random() * 260}px`; // Random horizontal position
  heart.style.top = '0px';
  heartsContainer.appendChild(heart);
  totalHearts++; // Increment total hearts generated

  // Move the heart down
  const fallInterval = setInterval(() => {
    const top = parseInt(heart.style.top) || 0;
    if (top >= 360) {
      clearInterval(fallInterval);
      heart.remove();
    } else {
      heart.style.top = `${top + 5 * speedMultiplier}px`; // Apply speed multiplier
    }
  }, 100);

  // Add click event to the heart
  heart.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    heart.remove();

    // Increase speed multiplier every 5 hearts caught
    if (score % 5 === 0) {
      speedMultiplier += 0.6; // Increase speed by 20%
      console.log(`Speed increased! Current speed multiplier: ${speedMultiplier}`);
    }
  });
}

// Function to show game result
function showGameResult() {
  const percentageCaught = (score / totalHearts) * 100; // Calculate percentage of hearts caught

  // Get the game overflow elements
  const gameOverflowHeader = document.querySelector('.game-overflow-header');
  const gameOverflowButton = document.querySelector('.game-overflow-button');
  const gameOverflow = document.querySelector('.game-overflow');
  const gameOverlay = document.createElement('div');
  gameOverlay.classList.add('game-overlay');

  // Set the result message and button text based on the percentage
  if (percentageCaught > 89) {
      gameOverflowHeader.textContent = 'Ты выиграла!';
      gameOverflowButton.textContent = 'Забрать приз';
      gameOverflowButton.addEventListener('click', () => {
          window.location.href = '../page2.html'; // Navigate to page2.html
      });
  } else if (percentageCaught > 70 && percentageCaught < 90) {
      gameOverflowHeader.textContent = 'Неплохо, но надо поднажать!';
      gameOverflowButton.textContent = 'Попробовать снова';
      gameOverflowButton.addEventListener('click', () => {
          location.reload(); // Reload the page to restart the game
      });
  } else if (percentageCaught > 50 && percentageCaught < 70) {
      gameOverflowHeader.textContent = 'Ты можешь лучше!';
      gameOverflowButton.textContent = 'Попробовать снова';
      gameOverflowButton.addEventListener('click', () => {
          location.reload(); // Reload the page to restart the game
      });
  } else if (percentageCaught > 30 && percentageCaught < 50) {
      gameOverflowHeader.textContent = 'Ты даже не стараешься!';
      gameOverflowButton.textContent = 'Попробовать снова';
      gameOverflowButton.addEventListener('click', () => {
          location.reload(); // Reload the page to restart the game
      });
  } else if (percentageCaught < 30) {
      gameOverflowHeader.textContent = 'Надо нажимать на сердечки падающие сверху!';
      gameOverflowButton.textContent = 'Попробовать снова';
      gameOverflowButton.addEventListener('click', () => {
          location.reload(); // Reload the page to restart the game
      });
  }

  // Show the game overflow and overlay
  gameOverflow.style.display = 'block';
  gameOverlay.style.display = 'block';
  document.body.appendChild(gameOverlay);
}

// Function to start the game
function startGame() {
  score = 0;
  totalHearts = 0; // Reset total hearts
  timeLeft = 30;
  speedMultiplier = 1; // Reset speed multiplier
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  // Create hearts every second
  heartInterval = setInterval(createHeart, 1000);

  // Update the timer every second
  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(heartInterval);
      showGameResult(); // Show game result when time is up
    }
  }, 1000);
}

// Start the game when the page loads
startGame();