document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.querySelector(".grid-container");
  const size = 4;
  let grid = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  function createBoard() {
    for (let i = 0; i < size * size; i++) {
      const gridCell = document.createElement("div");
      gridCell.classList.add("grid-cell");
      gridContainer.appendChild(gridCell);
    }
    addNewTile();
    addNewTile();
    updateBoard();
  }

  function addNewTile() {
    let added = false;
    while (!added) {
      let row = Math.floor(Math.random() * size);
      let col = Math.floor(Math.random() * size);
      if (grid[row][col] === 0) {
        grid[row][col] = Math.random() > 0.1 ? 2 : 4;
        added = true;
      }
    }
  }

  function updateBoard() {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((cell, index) => {
      cell.textContent = "";
      let row = Math.floor(index / size);
      let col = index % size;
      if (grid[row][col] !== 0) {
        cell.textContent = grid[row][col];
        cell.className = "grid-cell tile-" + grid[row][col];
      } else {
        cell.className = "grid-cell";
      }
    });
  }

  function moveTiles(direction) {
    let moved = false;
    for (let i = 0; i < size; i++) {
      let newRowOrCol;
      switch (direction) {
        case "up":
          newRowOrCol = slideTiles(grid.map((row) => row[i]));
          for (let j = 0; j < size; j++) {
            if (grid[j][i] !== newRowOrCol[j]) moved = true;
            grid[j][i] = newRowOrCol[j];
          }
          break;
        case "down":
          newRowOrCol = slideTiles(
            grid.map((row) => row[i]).reverse()
          ).reverse();
          for (let j = 0; j < size; j++) {
            if (grid[j][i] !== newRowOrCol[j]) moved = true;
            grid[j][i] = newRowOrCol[j];
          }
          break;
        case "left":
          newRowOrCol = slideTiles(grid[i]);
          if (grid[i].toString() !== newRowOrCol.toString()) moved = true;
          grid[i] = newRowOrCol;
          break;
        case "right":
          newRowOrCol = slideTiles(grid[i].reverse()).reverse();
          if (grid[i].toString() !== newRowOrCol.toString()) moved = true;
          grid[i] = newRowOrCol;
          break;
      }
    }
    if (moved) addNewTile();
    updateBoard();
  }

  function slideTiles(rowOrCol) {
    let filtered = rowOrCol.filter((val) => val);
    let empty = Array(size - filtered.length).fill(0);
    let newRowOrCol = [...filtered, ...empty];
    for (let i = 0; i < size - 1; i++) {
      if (newRowOrCol[i] === newRowOrCol[i + 1] && newRowOrCol[i] !== 0) {
        newRowOrCol[i] *= 2;
        newRowOrCol.splice(i + 1, 1);
        newRowOrCol.push(0);
      }
    }
    return newRowOrCol;
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        moveTiles("up");
        break;
      case "ArrowDown":
        moveTiles("down");
        break;
      case "ArrowLeft":
        moveTiles("left");
        break;
      case "ArrowRight":
        moveTiles("right");
        break;
    }
  });

  createBoard();
});
