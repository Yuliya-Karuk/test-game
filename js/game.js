const colors = {
   0: "#e81416",
   1: "#ff7f50",
   2: "#faeb36",
   3: "#79c314",
   4: "#487de7",
   5: "#70369d",
}

function getRandomColor() {
    const colorKeys = Object.keys(colors);
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    return randomKey;
}

export class Game {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.cellSize = 80;
        this.numCellsByX = this.canvas.width / this.cellSize;
        this.numCellsByY = this.canvas.width / this.cellSize;
        this.grid = [];

        document.querySelectorAll('.color').forEach(element => {
            element.addEventListener('click', (e) => this.onColorSelect(e));
        });

        this.createGrid();
        this.draw();
    }

    createGrid() {
        for (let row = 0; row < this.numCellsByY; row += 1) {
            this.grid[row] = [];
            for (let col = 0; col < this.numCellsByX; col += 1) {
                const randomColor = getRandomColor();

                this.grid[row][col] = {
                    color: randomColor,
                };
            }
        }
    }

    draw () {
        for (let row = 0; row < this.grid.length; row += 1) {
            for (let col = 0; col < this.grid[row].length; col += 1) {
                const cell = this.grid[row][col];

                this.context.fillStyle = colors[cell.color];
                this.context.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    onColorSelect (event) {
        const newColor = event.target.dataset.color;
        const startColor = this.grid[0][0].color;

        if (startColor !== newColor) {
            this.floodFill(0, 0, startColor, newColor);
            this.draw();
        }
    }

    floodFill(row, col, startColor, newColor) {
        if (row < 0 || col < 0 || row >= this.numCellsByY || col >= this.numCellsByX) {
            return;
        }

        if (this.grid[row][col].color !== startColor) {
            return;
        }

        this.grid[row][col].color = newColor;

        this.floodFill(row - 1, col, startColor, newColor);
        this.floodFill(row + 1, col, startColor, newColor);
        this.floodFill(row, col - 1, startColor, newColor);
        this.floodFill(row, col + 1, startColor, newColor);
    }
}
