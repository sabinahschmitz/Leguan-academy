<template>
<body>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <canvas width="400" height="400" id="game"></canvas>
    
</body>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Import ref and onMounted functions from Vue library

const canvas = ref(null); // Create a reference for canvas element
let context = null; // Initialize context variable

const grid = 12; // Define the size of the grid
let count = 0; // Initialize a counter variable

let snake = { // Define the snake object
  x: 160, // Initial x position of the snake
  y: 160, // Initial y position of the snake
  dx: grid, // Initial speed of the snake in x-direction
  dy: 0, // Initial speed of the snake in y-direction
  cells: [], // Array to store the snake's body cells
  maxCells: 8 // Maximum number of cells the snake can have
};

let apple = { // Define the apple object
  x: getRandomInt(0, 25) * grid, // Random initial x position for the apple
  y: getRandomInt(0, 25) * grid, // Random initial y position for the apple
  letter: getRandomLetter() // Random letter for the apple
};

function getRandomInt(min, max) { // Function to generate a random integer within a range
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomLetter() { // Function to generate a random letter
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Define the alphabet
  return alphabet[Math.floor(Math.random() * alphabet.length)]; // Return a random letter from the alphabet
}

function loop() { // Main game loop
  requestAnimationFrame(loop); // Request the next animation frame

  if (++count < 10) { // Limit the update rate of the game
    return; // Exit the loop if the count is less than 5
  }

  count = 0; // Reset the count

  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  snake.x += snake.dx; // Update the snake's x position
  snake.y += snake.dy; // Update the snake's y position

  // Wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  // Wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y }); // Add a new cell to the beginning of the snake's cells array
  if (snake.cells.length > snake.maxCells) { // If the snake has grown longer than its maximum length
    snake.cells.pop(); // Remove the last cell from the snake's cells array
  }

  // Draw the letter representing the apple
  context.fillStyle = 'red';
  context.font = 'bold 20px Arial';
  context.fillText(apple.letter, apple.x, apple.y + grid);

  // Draw the snake
  context.fillStyle = 'white'; // Set the fill color for the snake
  snake.cells.forEach(function(cell, index) { // Iterate over each cell of the snake
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1); // Draw a rectangle for each cell
  });

  // Check collision with apple
  if (snake.x < apple.x + grid &&
    snake.x + grid > apple.x &&
    snake.y < apple.y + grid &&
    snake.y + grid > apple.y) {
  snake.maxCells++;
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
  apple.letter = getRandomLetter();
}
  // Check collision with itself
  for (let i = index + 1; i < snake.cells.length; i++) { // Iterate over each cell of the snake
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) { // If the snake collides with itself
      resetGame(); // Reset the game
    }
  }
}

function resetGame() { // Function to reset the game
  alert('Game Over!'); // Show a game over message
  snake.x = 160; // Reset snake's x position
  snake.y = 160; // Reset snake's y position
  snake.cells = []; // Reset snake's cells array
  snake.maxCells = 4; // Reset snake's maximum cells
  snake.dx = grid; // Reset snake's x velocity
  snake.dy = 0; // Reset snake's y velocity

  apple.x = getRandomInt(0, 25) * grid; // Generate a new random x position for the apple
  apple.y = getRandomInt(0, 25) * grid; // Generate a new random y position for the apple
  apple.letter = getRandomLetter(); // Generate a new random letter for the apple
}

document.addEventListener('keydown', function(e) { // Event listener for keyboard input
  if (e.key === 'ArrowLeft' && snake.dx === 0) { // If left arrow key is pressed and snake is not moving horizontally
    snake.dx = -grid; // Change snake's horizontal velocity to left
    snake.dy = 0; // Stop snake's vertical movement
  } else if (e.key === 'ArrowUp' && snake.dy === 0) { // If up arrow key is pressed and snake is not moving vertically
    snake.dy = -grid; // Change snake's vertical velocity to up
    snake.dx = 0; // Stop snake's horizontal movement
  } else if (e.key === 'ArrowRight' && snake.dx === 0) { // If right arrow key is pressed and snake is not moving horizontally
    snake.dx = grid; // Change snake's horizontal velocity to right
    snake.dy = 0; // Stop snake's vertical movement
  } else if (e.key === 'ArrowDown' && snake.dy === 0) { // If down arrow key is pressed and snake is not moving vertically
    snake.dy = grid; // Change snake's vertical velocity to down
    snake.dx = 0; // Stop snake's horizontal movement
  }
});

onMounted(() => { // Function to run when the component is mounted
  canvas.value = document.getElementById('game'); // Get the canvas element
  context = canvas.value.getContext('2d'); // Get the 2D drawing context
  context.font = 'bold 16px Arial'; // Set the font style for drawing text
  canvas.value.width = 400; // Set the width of the canvas
  canvas.value.height = 400; // Set the height of the canvas
  requestAnimationFrame(loop); // Start the game loop
});


</script>

<style scoped>
html, body {
    height: 100%;
    margin: 0;
  }

  body {
    background: grey;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  canvas {
    border: 1px solid white;
  }

</style>