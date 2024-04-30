<template>
    <div>
      <header>
        <h1>Treasure Hunt Game</h1>
      </header>
      <div class="container">
        <div ref="gameContainer" class="th-grid"></div>
        <div class="th-instructions">
          <div ref="instructionPanel" class="instruction-content">Instructions will appear here.</div>
          
        </div>
      </div>
      <div class="treasure-image-container" v-show="treasureFound">
            <img src="/src/assets/icons/treasure.png" alt="Treasure" class="treasure-icon">
          </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const gridSize = 8;
  let grid = new Array(gridSize * gridSize).fill('');
  let hasTreasure = new Array(gridSize * gridSize).fill(false);
  let treasureIndex = Math.floor(Math.random() * grid.length);
  hasTreasure[treasureIndex] = true;
  let selectedIndex = gridSize * (gridSize - 1); // Bottom-left corner
  const directions = ['↑', '→', '↓', '←'];
  const directionText = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
  
  const gameContainer = ref(null);
  const instructionPanel = ref(null);
  
  onMounted(() => {
    console.log("Mounted!");
    initializeGrid();
    document.addEventListener('keydown', handleArrowKeyPress);
  });
  
  function handleArrowKeyPress(event) {
    let newIndex;
    switch(event.key) {
      case 'ArrowUp':
        newIndex = selectedIndex - gridSize;
        break;
      case 'ArrowRight':
        newIndex = selectedIndex + 1;
        break;
      case 'ArrowDown':
        newIndex = selectedIndex + gridSize;
        break;
      case 'ArrowLeft':
        newIndex = selectedIndex - 1;
        break;
      default:
        return; // Exit if key pressed is not an arrow key
    }
    if (newIndex >= 0 && newIndex < gridSize * gridSize) {
      // Remove the 'th-selected' class from the previously selected cell
      gameContainer.value.children[selectedIndex].classList.remove('th-selected');
      const cell = gameContainer.value.children[newIndex];
      revealContent(newIndex, cell);
      // Add the 'th-selected' class to the newly selected cell
      cell.classList.add('th-selected');
      selectedIndex = newIndex; // Update the selectedIndex
    }
  }
  
  function initializeGrid() {
    console.log("Initializing grid...");
    gameContainer.value.innerHTML = ''; // Clear previous cells if any
    for (let i = 0; i < grid.length; i++) {
      const cell = document.createElement('div');
      cell.className = 'th-cell';
      gameContainer.value.appendChild(cell);
    }
    console.log("Grid initialized!");
    setupClues();
    // Highlight the initially selected cell
    gameContainer.value.children[selectedIndex].classList.add('th-selected');
    // Set the first instruction
    instructionPanel.value.innerHTML = `<div>UP: Go UP!</div>`;
    // Add event listener for clicking on cells
    gameContainer.value.addEventListener('click', handleCellClick);
  }
  
  function handleCellClick(event) {
    event.preventDefault(); // Prevent default behavior (e.g., page scrolling)
    const cellIndex = Array.from(gameContainer.value.children).indexOf(event.target);
    const cell = gameContainer.value.children[cellIndex];
    const instruction = instructionPanel.value.textContent;
    const expectedDirection = instruction.split(' ')[1]; // Extract the expected direction
    const clickedDirection = getDirection(selectedIndex, cellIndex);
    if (clickedDirection !== expectedDirection) {
      cell.classList.add('th-wrong');
      endGame();
    } else {
      revealContent(cellIndex, cell);
    }
  }
  
  function setupClues() {
    console.log("Setting up clues...");
    let currentIndices = [treasureIndex];
    let visited = new Set(currentIndices);
    while (currentIndices.length > 0) {
      let nextIndices = [];
      currentIndices.forEach(index => {
        let possibleDirections = getPossibleDirections(index, visited);
        possibleDirections.forEach(dir => {
          let nextIndex = dir.nextIndex;
          if (!visited.has(nextIndex)) {
            grid[nextIndex] = dir.direction;
            nextIndices.push(nextIndex);
            visited.add(nextIndex);
          }
        });
      });
      currentIndices = nextIndices;
    }
    console.log("Clues set up!");
  }
  
  function getPossibleDirections(index, visited) {
    let directions = [];
    let row = Math.floor(index / gridSize);
    let col = index % gridSize;
    if (row > 0 && !visited.has(index - gridSize)) // Up
      directions.push({ direction: '↓', nextIndex: index - gridSize });
    if (col < gridSize - 1 && !visited.has(index + 1)) // Right
      directions.push({ direction: '←', nextIndex: index + 1 });
    if (row < gridSize - 1 && !visited.has(index + gridSize)) // Down
      directions.push({ direction: '↑', nextIndex: index + gridSize });
    if (col > 0 && !visited.has(index - 1)) // Left
      directions.push({ direction: '→', nextIndex: index - 1 });
    return directions;
  }
  
  
  function revealContent(index, cell) {
    // Remove the 'th-selected' class from the previously selected cell
    gameContainer.value.children[selectedIndex].classList.remove('th-selected');
    // Add the 'th-selected' class to the clicked cell
    cell.classList.add('th-selected');
    selectedIndex = index; // Update the selectedIndex
    if (index === treasureIndex) {
        // Display the treasure icon in the instructions panel
        cell.classList.add('treasure-icon');

        instructionPanel.value.innerHTML = '<div>Congratulations! You found the treasure!</div>' 
    } else if (grid[index]) {
        cell.textContent = grid[index];
        instructionPanel.value.innerHTML = `<div>${grid[index]}: Go ${directionText[directions.indexOf(grid[index])]}!</div>`;
    } else {
        cell.textContent = '⛏️';
        instructionPanel.value.textContent = 'No clue here. Try another cell.';
    }
}



  
  function endGame() {
    // Disable further interaction with cells
    gameContainer.value.removeEventListener('click', handleCellClick);
    document.removeEventListener('keydown', handleArrowKeyPress);
    // Display game over message
    instructionPanel.value.innerHTML += '<div>Game Over!</div>';
  }
  
  function getDirection(fromIndex, toIndex) {
    const fromRow = Math.floor(fromIndex / gridSize);
    const fromCol = fromIndex % gridSize;
    const toRow = Math.floor(toIndex / gridSize);
    const toCol = toIndex % gridSize;
    if (toRow < fromRow) return '↑'; // Up
    if (toRow > fromRow) return '↓'; // Down
    if (toCol > fromCol) return '→'; // Right
    if (toCol < fromCol) return '←'; // Left
    return '';
  }
  </script>
  
  <style scoped>
  .container{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  

  .th-instructions {
    display: flex; /* Make the instruction panel and treasure image container flex items */
    align-items: center; /* Align items vertically */
    justify-content: space-between; /* Space items evenly */
    font-size: 20px;
    border: 1px solid black;
    padding: 10px;
    width: 60%; /* Adjust width as needed */
  }

  .instruction-content {
    flex-grow: 1; /* Allow the instruction panel to grow */
  }

  .treasure-image-container {
    margin-left: 20px; /* Add space between the instruction panel and treasure image */
  }
</style>
