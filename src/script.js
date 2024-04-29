const gameContainer = document.getElementById('th-gameContainer');
const instructionPanel = document.getElementById('th-instructionPanel');
const gridSize = 8;
let grid = new Array(gridSize * gridSize).fill('');
let treasureIndex = Math.floor(Math.random() * grid.length);
let selectedIndex = gridSize * (gridSize - 1); // Bottom-left corner
const directions = ['↑', '→', '↓', '←'];
const directionText = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

document.addEventListener('keydown', handleArrowKeyPress);

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
        gameContainer.children[selectedIndex].classList.remove('th-selected');
        const cell = gameContainer.children[newIndex];
        revealContent(newIndex, cell);
        // Add the 'th-selected' class to the newly selected cell
        cell.classList.add('th-selected');
        selectedIndex = newIndex; // Update the selectedIndex
    }
}

function initializeGrid() {
    gameContainer.innerHTML = ''; // Clear previous cells if any
    for (let i = 0; i < grid.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'th-cell';
        cell.addEventListener('click', () => revealContent(i, cell));
        gameContainer.appendChild(cell);
    }
    setupClues();
    // Highlight the initially selected cell
    gameContainer.children[selectedIndex].classList.add('th-selected');
    // Set the first instruction
    instructionPanel.innerHTML = `<div>UP: Go UP!</div>`;
    // Add event listener for clicking on cells
    gameContainer.addEventListener('click', handleCellClick);
}

function handleCellClick(event) {
    const cellIndex = Array.from(gameContainer.children).indexOf(event.target);
    const cell = gameContainer.children[cellIndex];
    const instruction = instructionPanel.textContent;
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
    gameContainer.children[selectedIndex].classList.remove('th-selected');
    // Add the 'th-selected' class to the clicked cell
    cell.classList.add('th-selected');
    selectedIndex = index; // Update the selectedIndex
    if (index === treasureIndex) {
        cell.classList.add('th-treasure');
        instructionPanel.innerHTML = '<div>Congratulations! You found the treasure!</div>';
    } else if (grid[index]) {
        cell.textContent = grid[index];
        instructionPanel.innerHTML = `<div>${grid[index]}: Go ${directionText[directions.indexOf(grid[index])]}!</div>`;
    } else {
        cell.textContent = '⛏️';
        instructionPanel.textContent = 'No clue here. Try another cell.';
    }
}

function endGame() {
    // Disable further interaction with cells
    gameContainer.removeEventListener('click', handleCellClick);
    document.removeEventListener('keydown', handleArrowKeyPress);
    // Display game over message
    instructionPanel.innerHTML += '<div>Game Over!</div>';
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

initializeGrid();
